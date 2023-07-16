import { Inject, Injectable } from '@nestjs/common';

import { User, UserType } from './entities';
import {
  IUserDeleteUseCaseToken,
  IUserGetAllUseCaseToken,
  IUserGetUseCaseToken,
  IUserRegisterUseCaseToken,
  IUserUpdateUseCaseToken,
} from '../../features/users';
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
} from '../../features/users/application/usecases';

@Injectable()
export class UsersService {
  public async getBy(id: string): Promise<User> {
    const request = new UserGetRequest(id);
    const { user } = await this.getUseCase.handle(request);

    return this.convert(user);
  }

  public async getAll(): Promise<Iterable<User>> {
    const request = new UserGetAllRequest();
    const { users } = await this.getAllUseCase.handle(request);

    return Array.from(users).map((user) => this.convert(user));
  }

  public async register(name: string): Promise<User> {
    const request = new UserRegisterRequest(name);
    const { createdUserId } = await this.registerUseCase.handle(request);
    const { user } = await this.getUseCase.handle(
      new UserGetRequest(createdUserId),
    );

    return this.convert(user);
  }

  public async delete(id: string): Promise<void> {
    const request = new UserDeleteRequest(id);
    await this.deleteUseCase.handle(request);
  }

  public async update(id: string, name: string): Promise<User> {
    const request = new UserUpdateRequest(id, name);
    await this.updateUseCase.handle(request);

    const { user } = await this.getUseCase.handle(new UserGetRequest(id));

    return this.convert(user);
  }

  public constructor(
    @Inject(IUserGetUseCaseToken) getUseCase: IUserGetUseCase,
    @Inject(IUserGetAllUseCaseToken) getAllUseCase: IUserGetAllUseCase,
    @Inject(IUserRegisterUseCaseToken)
    registerUseCase: IUserRegisterUseCase,
    @Inject(IUserDeleteUseCaseToken) deleteUseCase: IUserDeleteUseCase,
    @Inject(IUserUpdateUseCaseToken) updateUseCase: IUserUpdateUseCase,
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
  private convert(user: UserData): User {
    return new User(
      user.id,
      user.name,
      user.type === 'Normal' ? UserType.Normal : UserType.Premium,
    );
  }
}
