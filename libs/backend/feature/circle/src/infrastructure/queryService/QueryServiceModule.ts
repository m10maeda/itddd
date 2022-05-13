import { Module } from '@nestjs/common';

import { PersistenceModule } from '../persistence';

@Module({
  imports: [PersistenceModule],
  providers: [],
  exports: [],
})
export class QueryServiceModule {}
