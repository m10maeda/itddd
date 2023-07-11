import { Module } from '@nestjs/common';

import { UsersPersistenceModule } from './persistences';

@Module({
  imports: [UsersPersistenceModule],
  providers: [],
  exports: [UsersPersistenceModule],
})
export class UsersInfrastructureModule {}
