import { Module } from '@nestjs/common';

import { InMemoryUserFactory } from './InMemoryUserFactory';
import { InMemoryUserRepository } from './InMemoryUserRepository';
import { InMemorySerialNumberAssigner } from '../../../shared/infrastructure';
import { User, UserId, UserName, UserType } from '../../domain';

const mockUsers = [
  new User(new UserId('0'), new UserName('Alice')),
  new User(new UserId('1'), new UserName('Bob'), UserType.Premium),
  new User(new UserId('2'), new UserName('Carol')),
  new User(new UserId('3'), new UserName('Dave')),
];

export const IUserRepositoryToken = Symbol('IUserRepository');
export const IUserFactoryToken = Symbol('IUserFactory');

@Module({
  providers: [
    {
      provide: IUserRepositoryToken,
      // TODO: Switch by environment
      useValue: new InMemoryUserRepository(mockUsers),
    },
    {
      provide: IUserFactoryToken,
      // TODO: Switch by environment
      useValue: new InMemoryUserFactory(
        new InMemorySerialNumberAssigner(mockUsers.length),
      ),
    },
  ],
  exports: [IUserRepositoryToken, IUserFactoryToken],
})
export class UsersPersistenceModule {}
