import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  NotFoundException,
  BadRequestException,
  ConflictException,
  Query,
  Patch,
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
import { PageInfoQuery } from '../shared/dto';

const notFoundResponseOption = {
  schema: {
    example: {
      statusCode: 404,
      message: 'User("id: 1") not found.',
      error: 'Not Found',
    },
  },
};

const badRequestResponseOption = {
  schema: {
    example: {
      statusCode: 400,
      message: 'UserName must not be empty.',
      error: 'Bad Request',
    },
  },
};

const conflictResponseResponseOption = {
  schema: {
    example: {
      statusCode: 409,
      message: 'Can not register user("name: Alice").',
      error: 'Conflict',
    },
  },
};

@ApiTags('users')
@Controller('users')
export class UsersController {
  @Get()
  @ApiOperation({ summary: 'Find users information' })
  @ApiOkResponse({ type: UserListResult })
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
  @ApiNotFoundResponse(notFoundResponseOption)
  public async getBy(@Param('id') id: string): Promise<User> {
    try {
      const { user } = await this.usersService.getBy(id);

      return this.convert(user);
    } catch (error) {
      if (error instanceof UserNotFoundException)
        throw new NotFoundException(error.message);

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
        throw new NotFoundException(error.message);
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
  @ApiNotFoundResponse(notFoundResponseOption)
  public async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.usersService.delete(id);
    } catch (error) {
      if (error instanceof UserNotFoundException)
        throw new NotFoundException(error.message);

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
      user.type === 'Normal' ? UserType.Normal : UserType.Premium,
    );
  }
}
