import { Module, type Provider } from '@nestjs/common';
import createClient from 'openapi-fetch';

import {
  CircleRepository,
  ICircleEventLoader,
  InMemoryCircleEventStore,
} from './circle-repository';
import { InMemoryCircleFactory } from './in-memory-circle-factory';
import { MemberRepository } from './member-repository';
import {
  InMemoryRelationEventStore,
  IRelationEventLoader,
  RelationRepository,
} from './relation-repository';
import {
  CircleEvent,
  ICircleFactory,
  ICircleRepository,
} from '../../domain/models/circle';
import { IMemberRepository } from '../../domain/models/member';
import {
  IRelationRepository,
  RelationEvent,
} from '../../domain/models/relation';
import { CircleEventBus } from '../event-bus/circle-event-bus';
import { EventBusModule } from '../event-bus/event-bus.module';
import { RelationEventBus } from '../event-bus/relation-event-bus';

import type { paths } from '@itddd/profiles-api';

export const CIRCLE_EVENT_LOADER = Symbol('CIRCLE_EVENT_LOADER');
export const CIRCLE_REPOSITORY = Symbol('CIRCLE_REPOSITORY');
export const CIRCLE_FACTORY = Symbol('CIRCLE_FACTORY');

export const RELATION_EVENT_LOADER = Symbol('RELATION_EVENT_LOADER');
export const RELATION_REPOSITORY = Symbol('RELATION_REPOSITORY');

export const MEMBER_REPOSITORY = Symbol('MEMBER_REPOSITORY');

@Module({
  imports: [EventBusModule],

  providers: [
    {
      provide: CIRCLE_EVENT_LOADER,
      useFactory: (bus: CircleEventBus) => {
        const store = new InMemoryCircleEventStore([]);

        bus.subscribe(CircleEvent, store);

        return store;
      },
      inject: [CircleEventBus],
    } satisfies Provider<InMemoryCircleEventStore>,

    {
      provide: CIRCLE_REPOSITORY,
      useFactory: (eventLoader: ICircleEventLoader) =>
        new CircleRepository(eventLoader),
      inject: [CIRCLE_EVENT_LOADER],
    } satisfies Provider<ICircleRepository>,

    {
      provide: CIRCLE_FACTORY,
      useFactory: () => new InMemoryCircleFactory(),
    } satisfies Provider<ICircleFactory>,

    {
      provide: RELATION_EVENT_LOADER,
      useFactory: (bus: RelationEventBus) => {
        const store = new InMemoryRelationEventStore([]);

        bus.subscribe(RelationEvent, store);

        return store;
      },
      inject: [RelationEventBus],
    } satisfies Provider<InMemoryRelationEventStore>,

    {
      provide: RELATION_REPOSITORY,
      useFactory: (eventLoader: IRelationEventLoader) =>
        new RelationRepository(eventLoader),
      inject: [RELATION_EVENT_LOADER],
    } satisfies Provider<IRelationRepository>,

    {
      provide: MEMBER_REPOSITORY,
      useFactory: () => {
        const client = createClient<paths>({
          baseUrl: process.env.PROFILES_SERVICE_URL ?? 'http://localhost:3001',
        });

        return new MemberRepository(client);
      },
    } satisfies Provider<IMemberRepository>,
  ],
  exports: [
    CIRCLE_REPOSITORY,
    CIRCLE_FACTORY,
    RELATION_REPOSITORY,
    MEMBER_REPOSITORY,
  ],
})
export class PersistenceModule {}
