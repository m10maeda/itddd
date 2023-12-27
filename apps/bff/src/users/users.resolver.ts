import { Inject } from '@nestjs/common';
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
import { IUsersDataAccess, USERS_DATA_ACCESS } from './users.data-access';
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
      return await this.usersDataAccess.getBy(id);
    } catch (error) {
      if (error instanceof UserNotFoundError) return error;

      throw error;
    }
  }

  @Query(() => UserList, {
    name: 'users',
    description: 'Find all users information',
  })
  public async findAllBy(
    @Args({ nullable: true }) pageInfoArgs: PageInfoArgs,
    @Args({ nullable: true }) findUsersArgs: FindUsersArgs,
  ): Promise<UserList> {
    const pageInfo = {
      page: pageInfoArgs.page,
      size: pageInfoArgs.size,
    };
    const criteria = {
      query: findUsersArgs.query,
      includes: findUsersArgs.includes,
      excludes: findUsersArgs.excludes,
    };

    return this.usersDataAccess.findAllBy(criteria, pageInfo);
  }

  @Mutation(() => UserRegistrationResult, {
    name: 'registerUser',
    description: 'Register a new user with specified input',
  })
  public async register(
    @Args('registerUserData') registerUserData: RegisterUserInput,
  ): Promise<typeof UserRegistrationResult> {
    const { name } = registerUserData;

    try {
      return await this.usersDataAccess.register(name);
    } catch (error) {
      if (error instanceof CanNotRegisterUserError) return error;

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
      await this.usersDataAccess.delete(id);

      return new UserDelete(id, true);
    } catch (error) {
      if (error instanceof UserNotFoundError) return new UserNotFoundError(id);

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
      return await this.usersDataAccess.update(id, name);
    } catch (error) {
      if (error instanceof CanNotRegisterUserError) return error;
      if (error instanceof UserNotFoundError) return error;

      throw error;
    }
  }

  public constructor(
    @Inject(USERS_DATA_ACCESS) usersDataAccess: IUsersDataAccess,
  ) {
    this.usersDataAccess = usersDataAccess;
  }

  private readonly usersDataAccess: IUsersDataAccess;
}
