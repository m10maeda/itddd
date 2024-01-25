import { Module } from '@nestjs/common';
import createClient from 'openapi-fetch';

import { UsersDataAccess } from './users.data-access';
import { paths } from '../../lib/schema';
import { USERS_DATA_ACCESS } from '../users/users.data-access';

@Module({
  providers: [
    {
      provide: 'USERS_API_CLIENT',
      useValue: createClient<paths>({
        baseUrl: 'http://localhost:3333',
      }),
    },
    {
      provide: USERS_DATA_ACCESS,
      useClass: UsersDataAccess,
    },
  ],
  exports: [USERS_DATA_ACCESS],
})
export class DataAccessModule {}
