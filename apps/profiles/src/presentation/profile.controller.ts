import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UseFilters,
} from '@nestjs/common';
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

import { RegisterProfileDto, UpdateProfileDto } from './dto';
import { Profile } from './entities';
import { ApplicationService, ProfileNotFoundException } from '../application';
import { ErrorResponseFilter, ProblemDetail } from './exception-filters';
import {
  CanNotRegisterProfileException,
  CanNotRenameProfileException,
} from '../application/exceptions';

import type { Response } from 'express';

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
export class ProfileController {
  private readonly service: ApplicationService;

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
      if (error instanceof ProfileNotFoundException)
        throw new NotFoundException();

      throw error;
    }
  }

  @Get()
  @ApiOkResponse({
    type: [Profile],
    example: [
      { id: '0', name: 'Alice' },
      { id: '1', name: 'Bob' },
    ],
  })
  public async getAll(): Promise<Profile[]> {
    const profiles = await this.service.findAll();

    return Array.from(profiles).map(
      (profile) => new Profile(profile.id, profile.name),
    );
  }

  @Get(':id')
  @ApiOkResponse({ type: Profile })
  @ApiNotFoundResponse({
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetail) },
      },
    },
  })
  public async getBy(@Param('id') id: string): Promise<Profile> {
    try {
      const profile = await this.service.getBy(id);

      return new Profile(profile.id, profile.name);
    } catch (error) {
      if (error instanceof ProfileNotFoundException)
        throw new NotFoundException();

      throw error;
    }
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
    @Body() registerProfileDto: RegisterProfileDto,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const registeredId = await this.service.register(registerProfileDto.name);

      response.set('Location', `/${registeredId}`);

      return response.send();
    } catch (error) {
      if (error instanceof CanNotRegisterProfileException)
        throw new ConflictException();

      throw error;
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    content: {
      'application/problem+json': {
        schema: { $ref: getSchemaPath(ProblemDetail) },
      },
    },
  })
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
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<void> {
    try {
      await this.service.rename(id, updateProfileDto.name);
    } catch (error) {
      if (error instanceof ProfileNotFoundException)
        throw new NotFoundException();
      if (error instanceof CanNotRenameProfileException)
        throw new ConflictException();

      throw error;
    }
  }

  public constructor(service: ApplicationService) {
    this.service = service;
  }
}
