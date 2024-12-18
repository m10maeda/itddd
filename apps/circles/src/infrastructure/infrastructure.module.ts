import { Module } from '@nestjs/common';

import { EventBusModule } from './event-bus/event-bus.module';
import { PersistenceModule } from './persistence/persistence.module';
import { QueryServiceModule } from './query-service/query-service.module';

@Module({
  imports: [EventBusModule, PersistenceModule, QueryServiceModule],

  exports: [EventBusModule, PersistenceModule, QueryServiceModule],
})
export class InfrastructureModule {}
