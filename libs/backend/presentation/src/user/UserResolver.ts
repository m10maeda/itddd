import {
  IUserDeleteUseCase,
  IUserGetAllUseCase,
  IUserGetUseCase,
  IUserRegisterUseCase,
  IUserUpdateUseCase,
  UserData,
  UserDeleteRequest,
  UserGetAllRequest,
  UserGetRequest,
  UserRegisterRequest,
  UserUpdateRequest,
  UserNotFoundException,
  CanNotRegisterUserException,
} from '@itddd/backend-feature-user';
import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import {
  CanNotRegisterUserError,
  User,
  UserNotFoundError,
  UserRegistrationResult,
  UserResult,
} from './models';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => User)
export class UserResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => UserResult, { name: 'user' })
  public async getBy(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<typeof UserResult> {
    try {
      const request = new UserGetRequest(id);
      const { user } = await this.getUseCase.handle(request);

      return this.convert(user);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return new UserNotFoundError(error.id, `User "${error.id}" not found`);
      }

      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [User], { name: 'users' })
  public async findAll(): Promise<User[]> {
    const request = new UserGetAllRequest();
    const { users } = await this.getAllUseCase.handle(request);

    return Array.from(users).map(this.convert);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => UserRegistrationResult, {
    name: 'registerUser',
  })
  public async register(
    @Args('name') name: string,
  ): Promise<typeof UserRegistrationResult> {
    try {
      const request = new UserRegisterRequest(name);
      const { createdUserId } = await this.registerUseCase.handle(request);
      const { user } = await this.getUseCase.handle(
        new UserGetRequest(createdUserId),
      );

      return this.convert(user);
    } catch (error) {
      if (error instanceof CanNotRegisterUserException) {
        return new CanNotRegisterUserError(
          error.name,
          `Can not register user "${error.name}"`,
        );
      }

      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Boolean, { name: 'deleteUser' })
  public async delete(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    try {
      const request = new UserDeleteRequest(id);
      await this.deleteUseCase.handle(request);

      return true;
    } catch (error) {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => UserRegistrationResult, { name: 'updateUser' })
  public async update(
    @Args('id', { type: () => ID }) id: string,
    @Args('name') name: string,
  ): Promise<typeof UserRegistrationResult> {
    try {
      const request = new UserUpdateRequest(id, name);
      await this.updateUseCase.handle(request);

      const { user } = await this.getUseCase.handle(new UserGetRequest(id));

      return this.convert(user);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return new UserNotFoundError(error.id, `User "${error.id}" not found`);
      }

      if (error instanceof CanNotRegisterUserException) {
        return new CanNotRegisterUserError(
          error.name,
          `Can not register user "${error.name}"`,
        );
      }

      throw error;
    }
  }

  public constructor(
    @Inject('IUserGetUseCase') getUseCase: IUserGetUseCase,
    @Inject('IUserGetAllUseCase') getAllUseCase: IUserGetAllUseCase,
    @Inject('IUserRegisterUseCase') registerUseCase: IUserRegisterUseCase,
    @Inject('IUserDeleteUseCase') deleteUseCase: IUserDeleteUseCase,
    @Inject('IUserUpdateUseCase') updateUseCase: IUserUpdateUseCase,
  ) {
    this.getUseCase = getUseCase;
    this.getAllUseCase = getAllUseCase;
    this.registerUseCase = registerUseCase;
    this.deleteUseCase = deleteUseCase;
    this.updateUseCase = updateUseCase;
  }

  private readonly getUseCase: IUserGetUseCase;

  private readonly getAllUseCase: IUserGetAllUseCase;

  private readonly registerUseCase: IUserRegisterUseCase;

  private readonly deleteUseCase: IUserDeleteUseCase;

  private readonly updateUseCase: IUserUpdateUseCase;

  // eslint-disable-next-line class-methods-use-this
  private convert(userData: UserData): User {
    return new User(userData.id, userData.name);
  }
}
