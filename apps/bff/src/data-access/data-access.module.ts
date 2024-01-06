import { Module } from '@nestjs/common';

import { CirclesDataAccess } from './circles.data-access';
import { UsersDataAccess } from './users.data-access';
import {
  CirclesApi,
  Configuration,
  UsersApi,
} from '../../lib/backend-adapter/v1.0';
import { CIRCLES_DATA_ACCESS } from '../circles/circles.data-access';
import { USERS_DATA_ACCESS } from '../users/users.data-access';

@Module({
  providers: [
    {
      provide: 'USERS_API_CLIENT',
      useValue: new UsersApi(
        new Configuration({
          // TODO: Switch by environment
          basePath: 'http://localhost:3333',
        }),
      ),
    },
    {
      provide: USERS_DATA_ACCESS,
      useClass: UsersDataAccess,
    },
    UsersDataAccess,
    {
      provide: 'CIRCLES_API_CLIENT',
      useValue: new CirclesApi(
        new Configuration({
          // TODO: Switch by environment
          basePath: 'http://localhost:3333',
        }),
      ),
    },
    {
      provide: CIRCLES_DATA_ACCESS,
      useClass: CirclesDataAccess,
    },
  ],
  exports: [USERS_DATA_ACCESS, CIRCLES_DATA_ACCESS],
})
export class DataAccessModule {}
