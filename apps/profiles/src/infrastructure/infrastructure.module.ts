import { Module } from '@nestjs/common';

import { EventBusModule } from './event-bus/event-bus.module';
import { MessengerModule } from './messenger/messenger.module';
import { PersistenceModule } from './persistence/persistence.module';

export {
  PROFILE_REPOSITORY,
  PROFILE_FACTORY,
} from './persistence/persistence.module';

@Module({
  imports: [PersistenceModule, EventBusModule, MessengerModule],

  exports: [PersistenceModule, EventBusModule],
})
export class InfrastructureModule {}
