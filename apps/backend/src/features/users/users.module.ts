import { Module } from '@nestjs/common';

import {
  UserDeleteInteractor,
  UserRegisterInteractor,
  UserUpdateInteractor,
} from './application/interactors';
import { IUserFactory, IUserRepository, UserService } from './domain';
import {
  UsersInfrastructureModule,
  UserFindAllQueryService,
  UserGetQueryService,
  IUserFactoryToken,
  IUserRepositoryToken,
} from './infrastructure';
import { UserSpecificationBuilder } from './infrastructure/query-services/specifications';

export const IUserGetUseCaseToken = Symbol('IUserGetUseCase');
export const IUserFindAllUseCaseToken = Symbol('IUserFindAllUseCase');
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
      provide: IUserFindAllUseCaseToken,
      useFactory: (userRepository: IUserRepository) =>
        new UserFindAllQueryService(
          userRepository,
          new UserSpecificationBuilder(),
        ),
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
    IUserFindAllUseCaseToken,
    IUserRegisterUseCaseToken,
    IUserDeleteUseCaseToken,
    IUserUpdateUseCaseToken,
  ],
})
export class UsersFeatureModule {}
