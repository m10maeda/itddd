import { Inject, Injectable } from '@nestjs/common';

import { User, UserList, UserType } from './models';
import {
  UsersApiInterface,
  User as UserSchema,
} from '../../lib/backend-adapter/v1.0';

@Injectable()
export class UsersService {
  public async getBy(id: string): Promise<User> {
    const user = await this.apiClient.usersControllerGetBy({ id });

    return UsersService.toUserFrom(user);
  }

  public async findAllBy(
    criteria?: {
      query?: string;
      includes?: string[];
      excludes?: string[];
    },
    pageInfo?: { page: number; size: number },
  ): Promise<UserList> {
    const data = await this.apiClient.usersControllerFindAllBy({
      ...criteria,
      ...pageInfo,
    });

    return new UserList(
      Array.from(data.users).map((schema) => UsersService.toUserFrom(schema)),
      data.total,
    );
  }

  public async register(name: string): Promise<User> {
    const data = await this.apiClient.usersControllerRegister({
      registerUserInput: { name },
    });

    return UsersService.toUserFrom(data);
  }

  public async delete(id: string): Promise<void> {
    await this.apiClient.usersControllerDelete({ id });
  }

  public async update(id: string, name: string): Promise<User> {
    const data = await this.apiClient.usersControllerUpdate({
      id,
      updateUserInput: { name },
    });

    return UsersService.toUserFrom(data);
  }

  public constructor(
    @Inject('UsersApiInterface') apiClient: UsersApiInterface,
  ) {
    this.apiClient = apiClient;
  }

  private readonly apiClient: UsersApiInterface;

  private static toUserFrom(schema: UserSchema): User {
    return new User(
      schema.id,
      schema.name,
      schema.type === 'Premium' ? UserType.Premium : UserType.Normal,
    );
  }
}
