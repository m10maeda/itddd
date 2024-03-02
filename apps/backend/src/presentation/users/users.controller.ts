import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  BadRequestException,
  ConflictException,
  Query,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import {
  RegisterUserInput,
  UpdateUserInput,
  UserFindQuery,
  UserListResult,
} from './dto';
import { User, UserType } from './entities';
import { UsersService } from './users.service';
import {
  CanNotRegisterUserException,
  UserData,
  UserNotFoundException,
} from '../../features/users/application/usecases';
import { ProbremDetail } from '../exception-filters';
import { PageInfoQuery } from '../shared/dto';

const notFoundResponseOption = {
  description: 'When user not found.',
  content: {
    'application/problem+json': {
      schema: { $ref: getSchemaPath(ProbremDetail) },
      example: {
        title: 'User not found.',
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
  description: 'When user name is conflicted.',
  content: {
    'application/problem+json': {
      schema: { $ref: getSchemaPath(ProbremDetail) },
      example: {
        title: 'User name is already exists.',
        statusCode: 409,
      },
    },
  },
};

@ApiTags('users')
@Controller('users')
export class UsersController {
  @Get()
  @ApiOperation({ summary: 'Find users information' })
  @ApiOkResponse({
    type: UserListResult,
    description: 'When some users are found.',
  })
  @ApiBadRequestResponse(badRequestResponseOption)
  public async findAllBy(
    @Query() criteria: UserFindQuery,
    @Query() pageInfo: PageInfoQuery,
  ): Promise<UserListResult> {
    try {
      const { users, total } = await this.usersService.findAll(
        {
          query: criteria.query,
          includeIds: criteria.includes,
          excludeIds: criteria.excludes,
        },
        pageInfo.toJson(),
      );

      return new UserListResult(
        Array.from(users).map((user) => this.convert(user)),
        total,
      );
    } catch (error) {
      if (error instanceof RangeError) throw new BadRequestException();

      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one user information by specified id' })
  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse(badRequestResponseOption)
  @ApiNotFoundResponse(notFoundResponseOption)
  public async getBy(@Param('id') id: string): Promise<User> {
    try {
      const { user } = await this.usersService.getBy(id);

      return this.convert(user);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new NotFoundException(
          'User not found.',
          `Could not find user with ID: ${id}.`,
        );
      }

      throw error;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Register a new user with specified input' })
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse(badRequestResponseOption)
  @ApiConflictResponse(conflictResponseResponseOption)
  public async register(
    @Body() createUserDto: RegisterUserInput,
  ): Promise<User> {
    try {
      const { createdUserId } = await this.usersService.register(
        createUserDto.name,
      );

      return await this.getBy(createdUserId);
    } catch (error) {
      if (error instanceof RangeError)
        throw new BadRequestException(error.message);
      if (error instanceof CanNotRegisterUserException)
        throw new ConflictException(error.message);

      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update user information with specified id and input',
  })
  @ApiNoContentResponse({ type: User })
  @ApiBadRequestResponse(badRequestResponseOption)
  @ApiNotFoundResponse(notFoundResponseOption)
  @ApiConflictResponse(conflictResponseResponseOption)
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserInput,
  ): Promise<User> {
    try {
      await this.usersService.update(id, updateUserDto.name);

      return await this.getBy(id);
    } catch (error) {
      if (error instanceof UserNotFoundException)
        throw new NotFoundException(
          'User not found.',
          `Could not find user with ID: ${id}.`,
        );
      if (error instanceof RangeError)
        throw new BadRequestException(error.message);
      if (error instanceof CanNotRegisterUserException)
        throw new ConflictException(error.message);

      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete the user with specivied id' })
  @ApiNoContentResponse()
  @ApiBadRequestResponse(badRequestResponseOption)
  @ApiNotFoundResponse(notFoundResponseOption)
  public async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.usersService.delete(id);
    } catch (error) {
      if (error instanceof UserNotFoundException)
        throw new NotFoundException(
          'User not found.',
          `Could not find user with ID: ${id}.`,
        );

      throw error;
    }
  }

  public constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  private readonly usersService: UsersService;

  // eslint-disable-next-line class-methods-use-this
  private convert(user: UserData): User {
    return new User(
      user.id,
      user.name,
      user.isPremium() ? UserType.Premium : UserType.Normal,
    );
  }
}
