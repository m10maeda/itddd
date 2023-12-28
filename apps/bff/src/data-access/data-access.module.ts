import { Module } from '@nestjs/common';

import { UsersDataAccess } from './users.data-access';
import { Configuration, UsersApi } from '../../lib/backend-adapter/v1.0';
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
  ],
  exports: [USERS_DATA_ACCESS],
})
export class DataAccessModule {}
