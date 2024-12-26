import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  OnModuleDestroy,
  OnModuleInit,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientKafka,
  EventPattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { CircleService } from './circle.service';
import {
  AddMemberDto,
  ChangeOwnerDto,
  EventType,
  PageInfoDto,
  ProfileEventDto,
  RegisterCircleDto,
  RenameCircleDto,
} from './dto';
import { Circle, Member } from './entities';
import { ErrorResponseFilter, ProblemDetail } from './exception-filters';
import {
  CanNotRegisterCircleException,
  CanNotRenameCircleException,
  CircleNotFoundException,
  RelationNotFoundException,
} from '../application/use-case/exceptions';

import type { Response } from 'express';

export const KAFKA_CLIENT = Symbol('KAFKA_CLIENT');

@Controller()
@UseFilters(ErrorResponseFilter)
@ApiExtraModels(ProblemDetail)
@ApiInternalServerErrorResponse({
  content: {
    'application/problem+json': {
      schema: { $ref: getSchemaPath(ProblemDetail) },
    },
  },
})
export class CircleController implements OnModuleDestroy, OnModuleInit {
  private readonly client: ClientKafka;

  private readonly service: CircleService;

  @Post(':id/members')
  @ApiCreatedResponse()
  @ApiBadRequestResponse({
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetail) },
      },
    },
  })
  @ApiConflictResponse({
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetail) },
      },
    },
  })
  public async addMember(
    @Param('id') id: string,
    @Body() acceptMemberDto: AddMemberDto,
  ): Promise<void> {
    try {
      await this.service.addMember(id, acceptMemberDto.id);
    } catch (error) {
      if (error instanceof CircleNotFoundException)
        throw new NotFoundException();

      throw error;
    }
  }

  @Put(':id/owner')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiBadRequestResponse({
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetail) },
      },
    },
  })
  @ApiNotFoundResponse({
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetail) },
      },
    },
  })
  @ApiConflictResponse({
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetail) },
      },
    },
  })
  public async changeOwner(
    @Param('id') id: string,
    @Body() { id: ownerId }: ChangeOwnerDto,
  ) {
    try {
      await this.service.changeOwner(id, ownerId);
    } catch (error) {
      if (error instanceof CircleNotFoundException)
        throw new NotFoundException();

      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse({
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetail) },
      },
    },
  })
  @ApiNotFoundResponse({
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetail) },
      },
    },
  })
  public async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.service.delete(id);
    } catch (error) {
      if (error instanceof CircleNotFoundException)
        throw new NotFoundException();

      throw error;
    }
  }

  @Get()
  @ApiOkResponse({
    type: [Circle],
    example: [
      { id: '0', name: 'Baseball', owner: '0', members: ['1', '4'] },
      { id: '1', name: 'Football', owner: '2', members: ['3', '4'] },
    ],
  })
  public async findAllBy(
    @Query() { page, size }: PageInfoDto,
  ): Promise<Iterable<Circle>> {
    const circles = await this.service.findAllBy(page, size);

    return Array.from(circles).map((circle) => Circle.create(circle));
  }

  @Get(':id')
  @ApiOkResponse({ type: Circle })
  @ApiNotFoundResponse({
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetail) },
      },
    },
  })
  public async getBy(@Param('id') id: string): Promise<Circle> {
    try {
      const circle = await this.service.getBy(id);

      return Circle.create(circle);
    } catch (error) {
      if (error instanceof CircleNotFoundException)
        throw new NotFoundException();

      throw error;
    }
  }

  @Get(':id/candidates')
  @ApiOkResponse({
    type: [Member],
    example: [{ id: '2' }, { id: '3' }],
  })
  @ApiNotFoundResponse({
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetail) },
      },
    },
  })
  public async getCandidatesBy(@Param('id') id: string): Promise<Member[]> {
    try {
      const candidates = await this.service.getCandidates(id);

      return Array.from(candidates).map(
        (candidate) => new Member(candidate.id),
      );
    } catch (error) {
      if (error instanceof CircleNotFoundException)
        throw new NotFoundException();

      throw error;
    }
  }

  @EventPattern('profiles', Transport.KAFKA)
  public async handle(@Payload(ValidationPipe) message: ProfileEventDto) {
    if (message.type === EventType.deleted) {
      await this.service.deleteRelations(message.id);
    }
  }

  public async onModuleDestroy() {
    await this.client.close();
  }

  public async onModuleInit() {
    this.client.subscribeToResponseOf('profiles');

    await this.client.connect();
  }

  @Post()
  @ApiCreatedResponse()
  @ApiBadRequestResponse({
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetail) },
      },
    },
  })
  @ApiConflictResponse({
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetail) },
      },
    },
  })
  public async register(
    @Body() registerCircleDto: RegisterCircleDto,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const registeredId = await this.service.register(
        registerCircleDto.name,
        registerCircleDto.owner,
      );

      response.set('Location', `/${registeredId}`);

      return response.send();
    } catch (error) {
      if (error instanceof CanNotRegisterCircleException)
        throw new ConflictException();

      throw error;
    }
  }

  @Delete(':id/members/:memberId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse({
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetail) },
      },
    },
  })
  @ApiNotFoundResponse({
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetail) },
      },
    },
  })
  public async removeMember(
    @Param('id') id: string,
    @Param('memberId') memberId: string,
  ): Promise<void> {
    try {
      await this.service.removeMember(id, memberId);
    } catch (error) {
      if (error instanceof CircleNotFoundException)
        throw new NotFoundException();
      if (error instanceof RelationNotFoundException)
        throw new NotFoundException();

      throw error;
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse({
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetail) },
      },
    },
  })
  @ApiNotFoundResponse({
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetail) },
      },
    },
  })
  @ApiConflictResponse({
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetail) },
      },
    },
  })
  public async update(
    @Param('id') id: string,
    @Body() renameCircleDto: RenameCircleDto,
  ): Promise<void> {
    try {
      await this.service.rename(id, renameCircleDto.name);
    } catch (error) {
      if (error instanceof CircleNotFoundException)
        throw new NotFoundException();
      if (error instanceof CanNotRenameCircleException)
        throw new ConflictException();

      throw error;
    }
  }

  public constructor(
    service: CircleService,
    @Inject(KAFKA_CLIENT) client: ClientKafka,
  ) {
    this.service = service;
    this.client = client;
  }
}
