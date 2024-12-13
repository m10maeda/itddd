import { Module } from '@nestjs/common';

import { EventBusModule } from './event-bus/event-bus.module';
import { PersistenceModule } from './persistence/persistence.module';

export {
  PROFILE_REPOSITORY,
  PROFILE_FACTORY,
} from './persistence/persistence.module';

@Module({
  imports: [PersistenceModule, EventBusModule],

  exports: [PersistenceModule, EventBusModule],
})
export class InfrastructureModule {}
