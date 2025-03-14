import { Module, type Provider } from '@nestjs/common';
import createClient from 'openapi-fetch';

import {
  CircleRepository,
  ICircleEventLoader,
  InMemoryCircleEventStore,
} from './circle-repository';
import { InMemoryCircleFactory } from './in-memory-circle-factory';
import { MemberExistenceService } from './member';
import {
  InMemoryRelationEventStore,
  IRelationEventLoader,
  RelationRepository,
} from './relation-repository';
import {
  CircleEvent,
  CircleId,
  CircleName,
  CircleRegistered,
  ICircleFactory,
  ICircleRepository,
} from '../../domain/models/circle';
import { IMemberExistenceService, MemberId } from '../../domain/models/member';
import {
  IRelationRepository,
  RelationCreated,
  RelationEvent,
  RelationType,
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

export const MEMBER_EXISTENCES_SERVICE = Symbol('MEMBER_EXISTENCES_SERVICE');

@Module({
  imports: [EventBusModule],

  providers: [
    {
      provide: CIRCLE_EVENT_LOADER,
      useFactory: (bus: CircleEventBus) => {
        const store = new InMemoryCircleEventStore([
          new CircleRegistered(
            new CircleId('0'),
            new CircleName('Baseball'),
            new MemberId('0'),
          ),
          new CircleRegistered(
            new CircleId('1'),
            new CircleName('Football'),
            new MemberId('2'),
          ),
        ]);

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
      useFactory: () => new InMemoryCircleFactory(2),
    } satisfies Provider<ICircleFactory>,

    {
      provide: RELATION_EVENT_LOADER,
      useFactory: (bus: RelationEventBus) => {
        const store = new InMemoryRelationEventStore([
          new RelationCreated(
            new CircleId('0'),
            new MemberId('0'),
            RelationType.Owner,
          ),
          new RelationCreated(
            new CircleId('0'),
            new MemberId('1'),
            RelationType.Member,
          ),
          new RelationCreated(
            new CircleId('0'),
            new MemberId('2'),
            RelationType.Member,
          ),
          new RelationCreated(
            new CircleId('1'),
            new MemberId('2'),
            RelationType.Owner,
          ),
          new RelationCreated(
            new CircleId('1'),
            new MemberId('3'),
            RelationType.Member,
          ),
          new RelationCreated(
            new CircleId('1'),
            new MemberId('4'),
            RelationType.Member,
          ),
        ]);

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
      provide: MEMBER_EXISTENCES_SERVICE,
      useFactory: () => {
        const client = createClient<paths>({
          baseUrl: process.env.PROFILES_SERVICE_URL ?? 'http://localhost:3001',
        });

        return new MemberExistenceService(client);
      },
    } satisfies Provider<IMemberExistenceService>,
  ],
  exports: [
    CIRCLE_REPOSITORY,
    CIRCLE_FACTORY,
    RELATION_REPOSITORY,
    MEMBER_EXISTENCES_SERVICE,
  ],
})
export class PersistenceModule {}
