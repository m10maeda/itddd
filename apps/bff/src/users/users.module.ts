import { Module } from '@nestjs/common';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
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
    UsersService,
    UsersResolver,
  ],
})
export class UsersModule {}
