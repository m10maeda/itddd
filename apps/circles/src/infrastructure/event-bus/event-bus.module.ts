import { Module, type Provider } from '@nestjs/common';

import { CircleEventBus } from './circle-event-bus';
import { RelationEventBus } from './relation-event-bus';

@Module({
  providers: [
    {
      provide: CircleEventBus,
      useFactory: () => new CircleEventBus(),
    } satisfies Provider<CircleEventBus>,

    {
      provide: RelationEventBus,
      useFactory: () => new RelationEventBus(),
    } satisfies Provider<RelationEventBus>,
  ],
  exports: [CircleEventBus, RelationEventBus],
})
export class EventBusModule {}
