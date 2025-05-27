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
  CircleAddedMember,
  CircleEvent,
  CircleId,
  CircleName,
  CircleRegistered,
  ICircleFactory,
  ICircleRepository,
} from '../../domain/models/circle';
import { IMemberExistenceService, MemberId } from '../../domain/models/member';
import { CircleEventBus } from '../event-bus/circle-event-bus';
import { EventBusModule } from '../event-bus/event-bus.module';

import type { paths } from '@itddd/profiles-api';

export const CIRCLE_EVENT_LOADER = Symbol('CIRCLE_EVENT_LOADER');
export const CIRCLE_REPOSITORY = Symbol('CIRCLE_REPOSITORY');
export const CIRCLE_FACTORY = Symbol('CIRCLE_FACTORY');

export const MEMBER_EXISTENCES_SERVICE = Symbol('MEMBER_EXISTENCES_SERVICE');

@Module({
  imports: [EventBusModule],

  providers: [
    {
      provide: CIRCLE_EVENT_LOADER,
      useFactory: (bus: CircleEventBus) => {
        // new CircleData('0', 'Baseball', '0', ['1', '2']),
        // new CircleData('1', 'Football', '2', ['3', '4']),
        const store = new InMemoryCircleEventStore([
          new CircleRegistered(
            new CircleId('0'),
            new CircleName('Baseball'),
            new MemberId('0'),
          ),
          new CircleAddedMember(new CircleId('0'), new MemberId('1')),
          new CircleAddedMember(new CircleId('0'), new MemberId('2')),
          new CircleRegistered(
            new CircleId('1'),
            new CircleName('Football'),
            new MemberId('2'),
          ),
          new CircleAddedMember(new CircleId('1'), new MemberId('3')),
          new CircleAddedMember(new CircleId('1'), new MemberId('4')),
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
      provide: MEMBER_EXISTENCES_SERVICE,
      useFactory: () => {
        const client = createClient<paths>({
          baseUrl: process.env.PROFILES_SERVICE_URL ?? 'http://localhost:3001',
        });

        return new MemberExistenceService(client);
      },
    } satisfies Provider<IMemberExistenceService>,
  ],
  exports: [CIRCLE_REPOSITORY, CIRCLE_FACTORY, MEMBER_EXISTENCES_SERVICE],
})
export class PersistenceModule {}
