import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { RegisterUserInput, UpdateUserInput } from './dto';
import {
  CanNotRegisterUserError,
  User,
  UserRegistrationResult,
  UserUpdateResult,
} from './models';
import { UsersService } from './users.service';
import { ResponseError } from '../../lib/backend-adapter/v1.0';

@Resolver(() => User)
export class UsersResolver {
  @Query(() => User, {
    name: 'user',
    description: 'Get one user information by specified id',
  })
  public async getBy(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<User> {
    try {
      return await this.service.getBy(id);
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.response.status === 404)
          throw new NotFoundException(`User(id: "${id}") is not found.`);
      }

      throw error;
    }
  }

  @Query(() => [User], {
    name: 'users',
    description: 'Get all users information',
  })
  public async getAll(): Promise<User[]> {
    const users = await this.service.getAll();

    return Array.from(users);
  }

  @Mutation(() => UserRegistrationResult, {
    name: 'registerUser',
    description: 'Register a new user with specified input',
  })
  public async register(
    @Args('registerUserData') registerUserInput: RegisterUserInput,
  ): Promise<typeof UserRegistrationResult> {
    const { name } = registerUserInput;

    try {
      return await this.service.register(name);
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.response.status === 400)
          return new CanNotRegisterUserError(name, `"${name}" is invalid.`);

        if (error.response.status === 409)
          return new CanNotRegisterUserError(
            name,
            `"${name}" is already registered.`,
          );
      }

      throw error;
    }
  }

  @Mutation(() => Boolean, {
    name: 'deleteUser',
    description: 'Delete the user with specivied id',
  })
  public async delete(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    try {
      await this.service.delete(id);

      return true;
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.response.status === 404)
          throw new NotFoundException(`User(id: "${id}") is not found.`);
      }

      return false;
    }
  }

  @Mutation(() => UserUpdateResult, {
    name: 'updateUser',
    description: 'Update user information with specified id and input',
  })
  public async update(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateUserData') updateUserData: UpdateUserInput,
  ): Promise<typeof UserUpdateResult> {
    const { name } = updateUserData;

    try {
      return await this.service.update(id, name);
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.response.status === 400)
          return new CanNotRegisterUserError(name, `"${name}" is invalid.`);

        if (error.response.status === 404)
          throw new NotFoundException(`User(id: "${id}") is not found.`);

        if (error.response.status === 409)
          return new CanNotRegisterUserError(
            name,
            `"${name}" is already registerd.`,
          );
      }

      throw error;
    }
  }

  public constructor(service: UsersService) {
    this.service = service;
  }

  private readonly service: UsersService;
}
