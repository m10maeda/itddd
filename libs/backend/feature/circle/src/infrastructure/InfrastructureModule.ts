import { Module } from '@nestjs/common';

import { PersistenceModule } from './persistence';

@Module({
  imports: [PersistenceModule],
  exports: [PersistenceModule],
})
export class InfrastructureModule {}
