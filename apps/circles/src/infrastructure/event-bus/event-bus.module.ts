import { Module, type Provider } from '@nestjs/common';

import { CircleEventBus } from './circle-event-bus';

@Module({
  providers: [
    {
      provide: CircleEventBus,
      useFactory: () => new CircleEventBus(),
    } satisfies Provider<CircleEventBus>,
  ],
  exports: [CircleEventBus],
})
export class EventBusModule {}
