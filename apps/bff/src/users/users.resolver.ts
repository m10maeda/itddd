import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { FindUsersArgs, RegisterUserInput, UpdateUserInput } from './dto';
import {
  CanNotRegisterUserError,
  User,
  UserType,
  UserDelete,
  UserDeleteResult,
  UserList,
  UserNotFoundError,
  UserRegistrationResult,
  UserResult,
  UserUpdateResult,
} from './models';
import {
  ResponseError,
  UsersApiInterface,
  User as UserSchema,
} from '../../lib/backend-adapter/v1.0';
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
      const user = await this.apiClient.usersControllerGetBy({ id });

      return this.convertToUserModel(user);
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
    @Args({ nullable: true }) pageInfoArgs: PageInfoArgs,
    @Args({ nullable: true }) findUsersArgs: FindUsersArgs,
  ): Promise<UserList> {
    const data = await this.apiClient.usersControllerFindAllBy({
      ...findUsersArgs,
      ...pageInfoArgs,
    });

    return new UserList(
      Array.from(data.users).map((schema) => this.convertToUserModel(schema)),
      data.total,
    );
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
      const data = await this.apiClient.usersControllerRegister({
        registerUserInput: { name },
      });

      return this.convertToUserModel(data);
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
      await this.apiClient.usersControllerDelete({ id });

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
      const data = await this.apiClient.usersControllerUpdate({
        id,
        updateUserInput: { name },
      });

      return this.convertToUserModel(data);
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

  public constructor(
    @Inject('UsersApiInterface') apiClient: UsersApiInterface,
  ) {
    this.apiClient = apiClient;
  }

  private readonly apiClient: UsersApiInterface;

  // eslint-disable-next-line class-methods-use-this
  private convertToUserModel(schema: UserSchema): User {
    return new User(
      schema.id,
      schema.name,
      schema.type === 'Premium' ? UserType.Premium : UserType.Normal,
    );
  }
}
