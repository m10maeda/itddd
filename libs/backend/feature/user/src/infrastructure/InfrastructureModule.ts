import { Module } from '@nestjs/common';

import { PersistenceModule } from './persistence/PersistenceModule';

@Module({
  imports: [PersistenceModule],
  providers: [],
  exports: [PersistenceModule],
})
export class InfrastructureModule {}
