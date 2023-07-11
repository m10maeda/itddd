import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
  BadRequestException,
  ConflictException,
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

import { RegisterUserInput, UpdateUserInput } from './dto';
import { User } from './entities';
import { UsersService } from './users.service';
import {
  CanNotRegisterUserException,
  UserNotFoundException,
} from '../../features/users/application/usecases';

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
  @ApiOperation({ summary: 'Find all users' })
  @ApiOkResponse({ type: [User] })
  public findAll(): Promise<Iterable<User>> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one user' })
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse(notFoundResponseOption)
  public async findOne(@Param('id') id: string): Promise<User> {
    try {
      return await this.usersService.findBy(id);
    } catch (error) {
      if (error instanceof UserNotFoundException)
        throw new NotFoundException(error.message);

      throw error;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Register user' })
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse(badRequestResponseOption)
  @ApiConflictResponse(conflictResponseResponseOption)
  public async register(
    @Body() createUserDto: RegisterUserInput,
  ): Promise<User> {
    try {
      return await this.usersService.register(createUserDto.name);
    } catch (error) {
      if (error instanceof RangeError)
        throw new BadRequestException(error.message);
      if (error instanceof CanNotRegisterUserException)
        throw new ConflictException(error.message);

      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiNoContentResponse({ type: User })
  @ApiBadRequestResponse(badRequestResponseOption)
  @ApiNotFoundResponse(notFoundResponseOption)
  @ApiConflictResponse(conflictResponseResponseOption)
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserInput,
  ): Promise<User> {
    try {
      return await this.usersService.update(id, updateUserDto.name);
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
  @ApiOperation({ summary: 'Delete user' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse(notFoundResponseOption)
  public async delete(@Param('id') id: string): Promise<void> {
    try {
      return await this.usersService.delete(id);
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
}
