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
  USER_FACTORY_TOKEN,
  USER_REPOSITORY_TOKEN,
} from './infrastructure';
import { UserSpecificationBuilder } from './infrastructure/query-services/specifications';

export const USER_GET_USE_CASE_TOKEN = Symbol('USER_GET_USE_CASE');
export const USER_FIND_ALL_USE_CASE_TOKEN = Symbol('USER_FIND_ALL_USE_CASE');
export const USER_REGISTER_USE_CASE_TOKEN = Symbol('USER_REGISTER_USE_CASE');
export const USER_DELETE_USE_CASE_TOKEN = Symbol('USER_DELETE_USE_CASE');
export const USER_UPDATE_USE_CASE_TOKEN = Symbol('USER_UPDATE_USE_CASE');

@Module({
  imports: [UsersInfrastructureModule],
  providers: [
    {
      provide: USER_GET_USE_CASE_TOKEN,
      useFactory: (userRepository: IUserRepository) =>
        new UserGetQueryService(userRepository),
      inject: [USER_REPOSITORY_TOKEN],
    },
    {
      provide: USER_FIND_ALL_USE_CASE_TOKEN,
      useFactory: (userRepository: IUserRepository) =>
        new UserFindAllQueryService(
          userRepository,
          new UserSpecificationBuilder(),
        ),
      inject: [USER_REPOSITORY_TOKEN],
    },
    {
      provide: USER_REGISTER_USE_CASE_TOKEN,
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
      inject: [USER_REPOSITORY_TOKEN, USER_FACTORY_TOKEN],
    },
    {
      provide: USER_DELETE_USE_CASE_TOKEN,
      useFactory: (userRepository: IUserRepository) =>
        new UserDeleteInteractor(userRepository),
      inject: [USER_REPOSITORY_TOKEN],
    },
    {
      provide: USER_UPDATE_USE_CASE_TOKEN,
      useFactory: (userRepository: IUserRepository) => {
        const userService = new UserService(userRepository);

        return new UserUpdateInteractor(userRepository, userService);
      },
      inject: [USER_REPOSITORY_TOKEN],
    },
  ],
  exports: [
    USER_GET_USE_CASE_TOKEN,
    USER_FIND_ALL_USE_CASE_TOKEN,
    USER_REGISTER_USE_CASE_TOKEN,
    USER_DELETE_USE_CASE_TOKEN,
    USER_UPDATE_USE_CASE_TOKEN,
  ],
})
export class UsersFeatureModule {}
