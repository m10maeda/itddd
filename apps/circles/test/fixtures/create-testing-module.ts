import { createMock } from '@golevelup/ts-jest';
import { ClientKafka } from '@nestjs/microservices';
import { Test, TestingModuleBuilder } from '@nestjs/testing';

import { circleEvents, circles } from './mocks';
import { stubMemberRepository } from './stub-member-repository';
import { AppModule } from '../../src/app.module';
import { CircleEvent } from '../../src/domain/models/circle';
import { CircleEventBus } from '../../src/infrastructure/event-bus/circle-event-bus';
import { InMemoryCircleEventStore } from '../../src/infrastructure/persistence/circle-repository';
import { InMemoryCircleFactory } from '../../src/infrastructure/persistence/in-memory-circle-factory';
import {
  CIRCLE_EVENT_LOADER,
  CIRCLE_FACTORY,
  MEMBER_EXISTENCES_SERVICE,
} from '../../src/infrastructure/persistence/persistence.module';
import { InMemoryCircleDataStore } from '../../src/infrastructure/query-service/in-memory-circle-data-store';
import { CIRCLE_DATA_ACCESS } from '../../src/infrastructure/query-service/query-service.module';
import { KAFKA_CLIENT } from '../../src/presentation';

export function createTestingModule(): TestingModuleBuilder {
  return Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(CIRCLE_EVENT_LOADER)
    .useFactory({
      factory: (bus: CircleEventBus) => {
        const store = new InMemoryCircleEventStore(circleEvents);

        bus.subscribe(CircleEvent, store);

        return store;
      },
      inject: [CircleEventBus],
    })
    .overrideProvider(CIRCLE_DATA_ACCESS)
    .useFactory({
      factory: (circleEventBus: CircleEventBus) => {
        const store = new InMemoryCircleDataStore(circles);

        circleEventBus.subscribe(CircleEvent, store);

        return store;
      },
      inject: [CircleEventBus],
    })
    .overrideProvider(MEMBER_EXISTENCES_SERVICE)
    .useValue(stubMemberRepository)
    .overrideProvider(CIRCLE_FACTORY)
    .useValue(new InMemoryCircleFactory(2))
    .overrideProvider(KAFKA_CLIENT)
    .useValue(createMock<ClientKafka>());
}
