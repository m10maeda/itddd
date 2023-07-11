import { Module } from '@nestjs/common';

import {
  UserDeleteInteractor,
  UserRegisterInteractor,
  UserUpdateInteractor,
} from './application/interactors';
import { IUserFactory, IUserRepository, UserService } from './domain';
import {
  UsersInfrastructureModule,
  UserGetAllQueryService,
  UserGetQueryService,
  IUserFactoryToken,
  IUserRepositoryToken,
} from './infrastructure';

export const IUserGetUseCaseToken = Symbol('IUserGetUseCase');
export const IUserGetAllUseCaseToken = Symbol('IUserGetAllUseCase');
export const IUserRegisterUseCaseToken = Symbol('IUserRegisterUseCase');
export const IUserDeleteUseCaseToken = Symbol('IUserDeleteUseCase');
export const IUserUpdateUseCaseToken = Symbol('IUserUpdateUseCase');

@Module({
  imports: [UsersInfrastructureModule],
  providers: [
    {
      provide: IUserGetUseCaseToken,
      useFactory: (userRepository: IUserRepository) =>
        new UserGetQueryService(userRepository),
      inject: [IUserRepositoryToken],
    },
    {
      provide: IUserGetAllUseCaseToken,
      useFactory: (userRepository: IUserRepository) =>
        new UserGetAllQueryService(userRepository),
      inject: [IUserRepositoryToken],
    },
    {
      provide: IUserRegisterUseCaseToken,
      useFactory: (
        userRepository: IUserRepository,
        userFactory: IUserFactory,
      ) => {
        const userService = new UserService(userRepository);

        return new UserRegisterInteractor(
          userRepository,
          userFactory,
          userService,
        );
      },
      inject: [IUserRepositoryToken, IUserFactoryToken],
    },
    {
      provide: IUserDeleteUseCaseToken,
      useFactory: (userRepository: IUserRepository) =>
        new UserDeleteInteractor(userRepository),
      inject: [IUserRepositoryToken],
    },
    {
      provide: IUserUpdateUseCaseToken,
      useFactory: (userRepository: IUserRepository) => {
        const userService = new UserService(userRepository);

        return new UserUpdateInteractor(userRepository, userService);
      },
      inject: [IUserRepositoryToken],
    },
  ],
  exports: [
    IUserGetUseCaseToken,
    IUserGetAllUseCaseToken,
    IUserRegisterUseCaseToken,
    IUserDeleteUseCaseToken,
    IUserUpdateUseCaseToken,
  ],
})
export class UsersFeatureModule {}
