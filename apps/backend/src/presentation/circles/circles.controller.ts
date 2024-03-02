import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { CirclesService } from './circles.service';
import {
  AcceptMemberInput,
  CircleFindQuery,
  CircleListResult,
  ExceptMemberInput,
  RegisterCircleInput,
  UpdateCircleInput,
} from './dto';
import { Circle } from './entities';
import {
  CanNotRegisterCircleException,
  CircleData,
  CircleNotFoundException,
} from '../../features/circles/application/usecases';
import { ProbremDetail } from '../exception-filters';
import { PageInfoQuery } from '../shared/dto';
import { UserListResult } from '../users/dto';
import { User, UserType } from '../users/entities';
import { UsersService } from '../users/users.service';

const notFoundResponseOption = {
  description: 'When circle not found.',
  content: {
    'application/problem+json': {
      schema: { $ref: getSchemaPath(ProbremDetail) },
      example: {
        title: 'Circle not found.',
        statusCode: 404,
      },
    },
  },
};

const badRequestResponseOption = {
  description: 'When any paramerers are invalid.',
  content: {
    'application/problem+json': {
      schema: { $ref: getSchemaPath(ProbremDetail) },
      example: {
        title: "Your request parameters didn't validate.",
        statusCode: 400,
      },
    },
  },
};

const conflictResponseResponseOption = {
  description: 'When circle name is conflicted.',
  content: {
    'application/problem+json': {
      schema: { $ref: getSchemaPath(ProbremDetail) },
      example: {
        title: 'Circle name is already exists.',
        statusCode: 409,
      },
    },
  },
};

@ApiTags('circles')
@Controller('circles')
export class CirclesController {
  @Get()
  @ApiOperation({ summary: 'Find circles information' })
  @ApiOkResponse({ type: CircleListResult })
  public async findAllBy(
    @Query() criteria: CircleFindQuery,
    @Query() pageInfo: PageInfoQuery,
  ): Promise<CircleListResult> {
    try {
      const { circles, total } = await this.circlesService.findAllBy(
        criteria,
        pageInfo.toJson(),
      );

      return new CircleListResult(
        Array.from(circles).map((circle) => this.convert(circle)),
        total,
      );
    } catch (error) {
      if (error instanceof RangeError) throw new BadRequestException();

      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one circle information by specified id' })
  @ApiOkResponse({ type: Circle })
  @ApiNotFoundResponse(notFoundResponseOption)
  public async getBy(@Param('id') id: string): Promise<Circle> {
    try {
      const { circle } = await this.circlesService.getBy(id);

      return this.convert(circle);
    } catch (error) {
      if (error instanceof CircleNotFoundException)
        throw new NotFoundException(error.message);

      throw error;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Register a new user with specified input' })
  @ApiCreatedResponse({ type: Circle })
  @ApiBadRequestResponse(badRequestResponseOption)
  @ApiConflictResponse(conflictResponseResponseOption)
  public async register(
    @Body() createCircleData: RegisterCircleInput,
  ): Promise<Circle> {
    try {
      const { createdCircleId } = await this.circlesService.register(
        createCircleData.name,
        createCircleData.owner,
      );

      return await this.getBy(createdCircleId);
    } catch (error) {
      if (error instanceof RangeError)
        throw new BadRequestException(error.message);
      if (error instanceof CanNotRegisterCircleException)
        throw new ConflictException(error.message);

      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete the circle with specivied id' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse(notFoundResponseOption)
  public async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.circlesService.delete(id);
    } catch (error) {
      if (error instanceof CircleNotFoundException)
        throw new NotFoundException(error.message);

      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update user information with specified id and input',
  })
  @ApiNoContentResponse({ type: Circle })
  @ApiBadRequestResponse(badRequestResponseOption)
  @ApiNotFoundResponse(notFoundResponseOption)
  @ApiConflictResponse(conflictResponseResponseOption)
  public async update(
    @Param('id') id: string,
    @Body() updateCircleData: UpdateCircleInput,
  ): Promise<Circle> {
    try {
      await this.circlesService.update(id, updateCircleData.name);

      return await this.getBy(id);
    } catch (error) {
      if (error instanceof CircleNotFoundException)
        throw new NotFoundException(error.message);
      if (error instanceof RangeError)
        throw new BadRequestException(error.message);
      if (error instanceof CanNotRegisterCircleException)
        throw new ConflictException(error.message);

      throw error;
    }
  }

  @Get(':id/members')
  @ApiOperation({ summary: 'Get all circle members' })
  @ApiOkResponse({ type: UserListResult })
  @ApiNotFoundResponse(notFoundResponseOption)
  public async getMembers(
    @Param('id') id: string,
    @Query() pageInfo: PageInfoQuery,
  ): Promise<UserListResult> {
    try {
      const { circle } = await this.circlesService.getBy(id);
      const { users, total } = await this.usersService.findAll(
        {
          includeIds: circle.members,
        },
        pageInfo.toJson(),
      );

      return new UserListResult(
        Array.from(users).map(
          (user) =>
            new User(
              user.id,
              user.name,
              user.isPremium() ? UserType.Premium : UserType.Normal,
            ),
        ),
        total,
      );
    } catch (error) {
      if (error instanceof CircleNotFoundException)
        throw new NotFoundException(error.message);

      throw error;
    }
  }

  @Post(':id/members')
  @ApiOperation({ summary: 'Accept one circle information by specified id' })
  @ApiOkResponse({ type: Circle })
  @ApiNotFoundResponse(notFoundResponseOption)
  public async acceptMember(
    @Param('id') id: string,
    @Body() acceptMemberData: AcceptMemberInput,
  ): Promise<Circle> {
    const { memberId } = acceptMemberData;

    await this.circlesService.accept(id, memberId);

    return this.getBy(id);
  }

  @Delete(':id/members/:memberId')
  @ApiOperation({ summary: 'Accept one circle information by specified id' })
  @ApiOkResponse({ type: Circle })
  @ApiNotFoundResponse(notFoundResponseOption)
  public async exceptMember(
    @Param('id') id: string,
    @Body() exceptMemberData: ExceptMemberInput,
  ): Promise<Circle> {
    const { memberId } = exceptMemberData;

    await this.circlesService.except(id, memberId);

    return this.getBy(id);
  }

  @Get(':id/candidates')
  @ApiOperation({ summary: 'Get circle member candidates' })
  @ApiOkResponse({ type: UserListResult })
  @ApiNotFoundResponse(notFoundResponseOption)
  public async getCandidates(
    @Param('id') id: string,
    @Query() pageInfo: PageInfoQuery,
  ): Promise<UserListResult> {
    try {
      const { circle } = await this.circlesService.getBy(id);
      const { users, total } = await this.usersService.findAll(
        {
          excludeIds: circle.members,
        },
        pageInfo.toJson(),
      );

      return new UserListResult(
        Array.from(users).map(
          (user) =>
            new User(
              user.id,
              user.name,
              user.isPremium() ? UserType.Premium : UserType.Normal,
            ),
        ),
        total,
      );
    } catch (error) {
      if (error instanceof CircleNotFoundException)
        throw new NotFoundException(error.message);

      throw error;
    }
  }

  public constructor(
    circlesService: CirclesService,
    usersService: UsersService,
  ) {
    this.circlesService = circlesService;
    this.usersService = usersService;
  }

  private readonly circlesService: CirclesService;

  private readonly usersService: UsersService;

  // eslint-disable-next-line class-methods-use-this
  private convert(circle: CircleData): Circle {
    return new Circle(circle.id, circle.name, circle.owner);
  }
}
