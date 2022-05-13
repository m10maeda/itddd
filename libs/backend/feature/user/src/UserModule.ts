import { Module } from '@nestjs/common';

import { UserService } from './domain/services';
import { InfrastructureModule } from './infrastructure';
import {
  UserGetInteractor,
  UserDeleteInteractor,
  UserGetAllInteractor,
  UserRegisterInteractor,
  UserUpdateInteractor,
} from './services';

@Module({
  imports: [InfrastructureModule],
  providers: [
    {
      provide: 'IUserGetUseCase',
      useFactory: (userRepository) => new UserGetInteractor(userRepository),
      inject: ['IUserRepository'],
    },
    {
      provide: 'IUserGetAllUseCase',
      useFactory: (userRepository) => new UserGetAllInteractor(userRepository),
      inject: ['IUserRepository'],
    },
    {
      provide: 'IUserRegisterUseCase',
      useFactory: (userRepository, userFactory) => {
        const userService = new UserService(userRepository);

        return new UserRegisterInteractor(
          userRepository,
          userFactory,
          userService,
        );
      },
      inject: ['IUserRepository', 'IUserFactory'],
    },
    {
      provide: 'IUserDeleteUseCase',
      useFactory: (userRepository) => new UserDeleteInteractor(userRepository),
      inject: ['IUserRepository'],
    },
    {
      provide: 'IUserUpdateUseCase',
      useFactory: (userRepository) => {
        const userService = new UserService(userRepository);

        return new UserUpdateInteractor(userRepository, userService);
      },
      inject: ['IUserRepository'],
    },
  ],
  exports: [
    'IUserGetUseCase',
    'IUserGetAllUseCase',
    'IUserRegisterUseCase',
    'IUserDeleteUseCase',
    'IUserUpdateUseCase',
    InfrastructureModule,
  ],
})
export class UserModule {}
