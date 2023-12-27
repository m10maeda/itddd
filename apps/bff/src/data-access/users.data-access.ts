import { Inject, Injectable } from '@nestjs/common';

import {
  ResponseError,
  UsersApiInterface,
  User as UserSchema,
} from '../../lib/backend-adapter/v1.0';
import {
  User,
  CanNotRegisterUserError,
  UserType,
  UserList,
  UserNotFoundError,
} from '../users';
import {
  IUsersDataAccess,
  type PageInfo,
  type Criteria,
} from '../users/users.data-access';

@Injectable()
export class UsersDataAccess implements IUsersDataAccess {
  public async getBy(id: string): Promise<User> {
    try {
      const user = await this.apiClient.usersControllerGetBy({ id });

      return this.convertToUserModel(user);
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.response.status === 404) throw new UserNotFoundError(id);
      }

      throw error;
    }
  }

  public async findAllBy(
    criteria?: Criteria,
    pageInfo?: PageInfo,
  ): Promise<UserList> {
    const data = await this.apiClient.usersControllerFindAllBy({
      ...criteria,
      ...pageInfo,
    });

    return new UserList(
      Array.from(data.users).map((schema) => this.convertToUserModel(schema)),
      data.total,
    );
  }

  public async register(name: string): Promise<User> {
    try {
      const data = await this.apiClient.usersControllerRegister({
        registerUserInput: { name },
      });

      return this.convertToUserModel(data);
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.response.status === 400)
          throw new CanNotRegisterUserError(name, `"${name}" is invalid.`);

        if (error.response.status === 409)
          throw new CanNotRegisterUserError(
            name,
            `"${name}" is already registered.`,
          );
      }

      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.apiClient.usersControllerDelete({ id });
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.response.status === 404) throw new UserNotFoundError(id);
      }

      throw error;
    }
  }

  public async update(id: string, name: string): Promise<User> {
    try {
      const user = await this.apiClient.usersControllerUpdate({
        id,
        updateUserInput: { name },
      });

      return this.convertToUserModel(user);
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.response.status === 400)
          throw new CanNotRegisterUserError(name, `"${name}" is invalid.`);

        if (error.response.status === 404) throw new UserNotFoundError(id);

        if (error.response.status === 409)
          throw new CanNotRegisterUserError(
            name,
            `"${name}" is already registerd.`,
          );
      }

      throw error;
    }
  }

  public constructor(@Inject('USERS_API_CLIENT') apiClient: UsersApiInterface) {
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
