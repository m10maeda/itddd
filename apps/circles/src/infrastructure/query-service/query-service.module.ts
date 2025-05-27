import { Module, type Provider } from '@nestjs/common';
import createClient from 'openapi-fetch';

import { ICircleDataAccess } from './circle-data-access';
import { FindAllCirclesQueryService } from './find-all-circles.query-service';
import { GetCandidatesQueryService } from './get-candidates.query-service';
import { GetCircleQueryService } from './get-circle.query-service';
import { InMemoryCircleDataStore } from './in-memory-circle-data-store';
import {
  CircleData,
  IFindAllCirclesUseCaseInputPort,
  IGetCandidatesUseCaseInputPort,
  IGetCircleUseCaseInputPort,
} from '../../application/use-case/input-ports';
import { CircleEvent } from '../../domain/models/circle';
import { CircleEventBus } from '../event-bus/circle-event-bus';
import { EventBusModule } from '../event-bus/event-bus.module';

import type { paths } from '@itddd/profiles-api';

export const CIRCLE_DATA_ACCESS = Symbol('CIRCLE_DATA_ACCESS');

export const GET_CIRCLE_USE_CASE_INPUT_PORT = Symbol(
  'GET_CIRCLE_USE_CASE_INPUT_PORT',
);
export const FIND_ALL_CIRCLES_USE_CASE_INPUT_PORT = Symbol(
  'FIND_ALL_CIRCLES_USE_CASE_INPUT_PORT',
);
export const GET_CANDIDATES_USE_CASE_INPUT_PORT = Symbol(
  'GET_CANDIDATES_USE_CASE_INPUT_PORT',
);

@Module({
  imports: [EventBusModule],

  providers: [
    {
      provide: CIRCLE_DATA_ACCESS,
      useFactory: (circleEventBus: CircleEventBus) => {
        const store = new InMemoryCircleDataStore([
          new CircleData('0', 'Baseball', '0', ['1', '2']),
          new CircleData('1', 'Football', '2', ['3', '4']),
        ]);

        circleEventBus.subscribe(CircleEvent, store);

        return store;
      },
      inject: [CircleEventBus],
    } satisfies Provider<ICircleDataAccess>,

    {
      provide: GET_CIRCLE_USE_CASE_INPUT_PORT,
      useFactory: (circleDataAccess: ICircleDataAccess) =>
        new GetCircleQueryService(circleDataAccess),
      inject: [CIRCLE_DATA_ACCESS],
    } satisfies Provider<IGetCircleUseCaseInputPort>,

    {
      provide: FIND_ALL_CIRCLES_USE_CASE_INPUT_PORT,
      useFactory: (circleDataAccess: ICircleDataAccess) =>
        new FindAllCirclesQueryService(circleDataAccess),
      inject: [CIRCLE_DATA_ACCESS],
    } satisfies Provider<IFindAllCirclesUseCaseInputPort>,

    {
      provide: GET_CANDIDATES_USE_CASE_INPUT_PORT,
      useFactory: (circleDataAccess: ICircleDataAccess) => {
        const client = createClient<paths>({
          baseUrl: process.env.PROFILES_SERVICE_URL ?? 'http://localhost:3001',
        });

        return new GetCandidatesQueryService(circleDataAccess, client);
      },
      inject: [CIRCLE_DATA_ACCESS],
    } satisfies Provider<IGetCandidatesUseCaseInputPort>,
  ],

  exports: [
    GET_CIRCLE_USE_CASE_INPUT_PORT,
    FIND_ALL_CIRCLES_USE_CASE_INPUT_PORT,
    GET_CANDIDATES_USE_CASE_INPUT_PORT,
  ],
})
export class QueryServiceModule {}
