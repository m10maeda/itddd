import { createMock } from '@golevelup/ts-jest';
import { ClientKafka } from '@nestjs/microservices';
import { Test, TestingModuleBuilder } from '@nestjs/testing';

import { circleEvents, circles, relationEvents } from './mocks';
import { stubMemberRepository } from './stub-member-repository';
import { AppModule } from '../../src/app.module';
import { CircleEvent } from '../../src/domain/models/circle';
import { RelationEvent } from '../../src/domain/models/relation';
import { CircleEventBus } from '../../src/infrastructure/event-bus/circle-event-bus';
import { RelationEventBus } from '../../src/infrastructure/event-bus/relation-event-bus';
import { InMemoryCircleEventStore } from '../../src/infrastructure/persistence/circle-repository';
import { InMemoryCircleFactory } from '../../src/infrastructure/persistence/in-memory-circle-factory';
import {
  CIRCLE_EVENT_LOADER,
  CIRCLE_FACTORY,
  MEMBER_REPOSITORY,
  RELATION_EVENT_LOADER,
} from '../../src/infrastructure/persistence/persistence.module';
import { InMemoryRelationEventStore } from '../../src/infrastructure/persistence/relation-repository';
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
    .overrideProvider(RELATION_EVENT_LOADER)
    .useFactory({
      factory: (bus: RelationEventBus) => {
        const store = new InMemoryRelationEventStore(relationEvents);

        bus.subscribe(RelationEvent, store);

        return store;
      },
      inject: [RelationEventBus],
    })
    .overrideProvider(CIRCLE_DATA_ACCESS)
    .useFactory({
      factory: (
        circleEventBus: CircleEventBus,
        relationEventBus: RelationEventBus,
      ) => {
        const store = new InMemoryCircleDataStore(circles);

        circleEventBus.subscribe(CircleEvent, store);
        relationEventBus.subscribe(RelationEvent, store);

        return store;
      },
      inject: [CircleEventBus, RelationEventBus],
    })
    .overrideProvider(MEMBER_REPOSITORY)
    .useValue(stubMemberRepository)
    .overrideProvider(CIRCLE_FACTORY)
    .useValue(new InMemoryCircleFactory(2))
    .overrideProvider(KAFKA_CLIENT)
    .useValue(createMock<ClientKafka>());
}
