import { Module } from '@nestjs/common';

import { UsersResolver } from './users.resolver';
import { Configuration, UsersApi } from '../../lib/backend-adapter/v1.0';

@Module({
  providers: [
    {
      provide: 'UsersApiInterface',
      useValue: new UsersApi(
        new Configuration({
          // TODO: Switch by environment
          basePath: 'http://localhost:3333',
        }),
      ),
    },
    UsersResolver,
  ],
})
export class UsersModule {}
