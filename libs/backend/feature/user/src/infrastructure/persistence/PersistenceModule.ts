import { InMemorySerialNumberAssigner } from '@itddd/backend-feature-shared';
import { Module } from '@nestjs/common';

import { User, UserId, UserName } from '../../domain/models';
import { InMemoryUserFactory } from './InMemoryUserFactory';
import { InMemoryUserRepository } from './InMemoryUserRepository';

const mockUsers = [
  new User(new UserId('0'), new UserName('Alice')),
  new User(new UserId('1'), new UserName('Bob')),
  new User(new UserId('2'), new UserName('Carol')),
  new User(new UserId('3'), new UserName('Dave')),
];

@Module({
  providers: [
    {
      provide: 'IUserRepository',
      // TODO: Switch by environment
      useValue: new InMemoryUserRepository(mockUsers),
    },
    {
      provide: 'IUserFactory',
      // TODO: Switch by environment
      useValue: new InMemoryUserFactory(
        new InMemorySerialNumberAssigner(mockUsers.length),
      ),
    },
  ],
  exports: ['IUserRepository', 'IUserFactory'],
})
export class PersistenceModule {}
