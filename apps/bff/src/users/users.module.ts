import { Module } from '@nestjs/common';

import { UsersResolver } from './users.resolver';
import { DataAccessModule } from '../data-access/data-access.module';

@Module({
  imports: [DataAccessModule],
  providers: [UsersResolver],
  exports: [],
})
export class UsersModule {}
