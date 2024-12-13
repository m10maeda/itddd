import { Module, type Provider } from '@nestjs/common';

import { ProfileEventBus } from './profile-event-bus';

@Module({
  providers: [
    {
      provide: ProfileEventBus,
      useFactory: () => new ProfileEventBus(),
    } satisfies Provider<ProfileEventBus>,
  ],
  exports: [ProfileEventBus],
})
export class EventBusModule {}
