import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { FindUsersArgs, RegisterUserInput, UpdateUserInput } from './dto';
import {
  CanNotRegisterUserError,
  User,
  UserDelete,
  UserDeleteResult,
  UserList,
  UserNotFoundError,
  UserRegistrationResult,
  UserResult,
  UserUpdateResult,
} from './models';
import { UsersService } from './users.service';
import { ResponseError } from '../../lib/backend-adapter/v1.0';
import { PageInfoArgs } from '../shared';

@Resolver(() => User)
export class UsersResolver {
  @Query(() => UserResult, {
    name: 'user',
    description: 'Get one user information by specified id',
  })
  public async getBy(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<typeof UserResult> {
    try {
      return await this.service.getBy(id);
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.response.status === 404) return new UserNotFoundError(id);
      }

      throw error;
    }
  }

  @Query(() => UserList, {
    name: 'users',
    description: 'Find all users information',
  })
  public async findAllBy(
    @Args({ nullable: true }) findUsersArgs?: FindUsersArgs,
    @Args({ nullable: true }) pageInfoArgs?: PageInfoArgs,
  ): Promise<UserList> {
    return this.service.findAllBy(findUsersArgs, pageInfoArgs);
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

  @Mutation(() => UserDeleteResult, {
    name: 'deleteUser',
    description: 'Delete the user with specivied id',
  })
  public async delete(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<typeof UserDeleteResult> {
    try {
      await this.service.delete(id);

      return new UserDelete(id, true);
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.response.status === 404) return new UserNotFoundError(id);
      }

      return new UserDelete(id, false);
    }
  }

  @Mutation(() => UserUpdateResult, {
    name: 'updateUser',
    description: 'Update user information with specified id and input',
  })
  public async update(
    @Args('updateUserData') updateUserData: UpdateUserInput,
  ): Promise<typeof UserUpdateResult> {
    const { id, name } = updateUserData;

    try {
      return await this.service.update(id, name);
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.response.status === 400)
          return new CanNotRegisterUserError(name, `"${name}" is invalid.`);

        if (error.response.status === 404) return new UserNotFoundError(id);

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
