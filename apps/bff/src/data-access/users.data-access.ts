import { Inject, Injectable } from '@nestjs/common';
import createClient from 'openapi-fetch';

import { paths, type components } from '../../lib/schema';
import {
  User,
  // CanNotRegisterUserError,
  UserType,
  UserList,
  UserNotFoundError,
} from '../users';
import {
  IUsersDataAccess,
  type PageInfo,
  type Criteria,
} from '../users/users.data-access';

type ApiClient = ReturnType<typeof createClient<paths>>;

@Injectable()
export class UsersDataAccess implements IUsersDataAccess {
  public async getBy(id: string): Promise<User> {
    const { data, error } = await this.apiClient.get('/users/{id}', {
      params: {
        path: { id },
      },
    });

    // FIXME: Implement error detail
    if (error) throw new Error();
    if (data === undefined) throw new UserNotFoundError(id);

    return this.convertToUserModel(data);
  }

  public async findAllBy(
    criteria?: Criteria,
    pageInfo?: PageInfo,
  ): Promise<UserList> {
    const { data } = await this.apiClient.get('/users', {
      params: {
        query: {
          ...criteria,
          ...pageInfo,
        },
      },
    });

    // FIXME: Implement error detail
    if (data === undefined) throw new Error();

    return new UserList(
      Array.from(data.users).map((schema) => this.convertToUserModel(schema)),
      data.total,
    );
  }

  public async register(name: string): Promise<User> {
    const { data, error } = await this.apiClient.post('/users', {
      body: { name },
    });

    // FIXME: Implement error detail
    if (error) throw new Error();
    // FIXME: Implement error detail
    if (data === undefined) throw new Error();
    // throw new CanNotRegisterUserError(name, `"${name}" is invalid.`);
    // throw new CanNotRegisterUserError(
    //   name,
    //   `"${name}" is already registered.`,
    // );

    return this.convertToUserModel(data);
  }

  public async delete(id: string): Promise<void> {
    const { error } = await this.apiClient.del('/users/{id}', {
      params: { path: { id } },
    });

    // FIXME: Implement error detail
    if (error) throw new Error();
  }

  public async update(id: string, name: string): Promise<User> {
    const { data, error } = await this.apiClient.patch('/users/{id}', {
      params: { path: { id } },
      body: { name },
    });

    // FIXME: Implement error detail
    if (error) throw new Error();
    // FIXME: Implement error detail
    if (data === undefined) throw new Error();
    // throw new CanNotRegisterUserError(name, `"${name}" is invalid.`);
    // throw new CanNotRegisterUserError(
    //   name,
    //   `"${name}" is already registerd.`,
    // );

    return this.convertToUserModel(data);
  }

  public constructor(@Inject('USERS_API_CLIENT') apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  private readonly apiClient: ApiClient;

  // eslint-disable-next-line class-methods-use-this
  private convertToUserModel(schema: components['schemas']['User']): User {
    return new User(
      schema.id,
      schema.name,
      schema.type === 'Premium' ? UserType.Premium : UserType.Normal,
    );
  }
}
