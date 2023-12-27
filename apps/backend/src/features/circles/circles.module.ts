import { Module } from '@nestjs/common';

import {
  CircleDeleteInteractor,
  CircleRegisterInteractor,
  CircleUpdateInteractor,
  CircleAcceptMemberInteractor,
  CircleExceptMemberInteractor,
} from './application/interactors';
import {
  CircleService,
  ICircleFactory,
  ICircleMemberRepository,
  ICircleRepository,
} from './domain';
import {
  CirclesInfrastructureModule,
  CircleGetCandidatesQueryService,
  CircleGetQueryService,
  CircleFindAllQueryService,
} from './infrastructure';
import {
  CIRCLE_FACTORY_TOKEN,
  CIRCLE_MEMBER_REPOSITORY_TOKEN,
  CIRCLE_REPOSITORY_TOKEN,
} from './infrastructure/persistences';
import { CircleSpecificationBuilder } from './infrastructure/query-services/specification';
import { UsersFeatureModule } from '../users';

export const CIRCLE_GET_USE_CASE_TOKEN = Symbol('CIRCLE_GET_USE_CASE');
export const CIRCLE_FIND_ALL_USE_CASE_TOKEN = Symbol(
  'CIRCLE_FIND_ALL_USE_CASE',
);
export const CIRCLE_REGISTER_USE_CASE_TOKEN = Symbol(
  'CIRCLE_REGISTER_USE_CASE',
);
export const CIRCLE_DELETE_USE_CASE_TOKEN = Symbol('CIRCLE_DELETE_USE_CASE');
export const CIRCLE_UPDATE_USE_CASE_TOKEN = Symbol('CIRCLE_UPDATE_USE_CASE');
export const CIRCLE_GET_CANDIDATES_USE_CASE_TOKEN = Symbol(
  'CIRCLE_GET_CANDIDATES_USE_CASE_TOKEN',
);
export const CIRCLE_ACCEPT_MEMBER_USE_CASE_TOKEN = Symbol(
  'CIRCLE_ACCEPT_MEMBER_USE_CASE',
);
export const CIRCLE_EXCEPT_MEMBER_USE_CASE_TOKEN = Symbol(
  'CIRCLE_EXCEPT_MEMBER_USE_CASE',
);

@Module({
  imports: [CirclesInfrastructureModule, UsersFeatureModule],
  providers: [
    {
      provide: CIRCLE_GET_USE_CASE_TOKEN,
      useFactory: (circleRepository: ICircleRepository) =>
        new CircleGetQueryService(circleRepository),
      inject: [CIRCLE_REPOSITORY_TOKEN],
    },

    {
      provide: CIRCLE_FIND_ALL_USE_CASE_TOKEN,
      useFactory: (circleRepository: ICircleRepository) =>
        new CircleFindAllQueryService(
          circleRepository,
          new CircleSpecificationBuilder(),
        ),
      inject: [CIRCLE_REPOSITORY_TOKEN],
    },

    {
      provide: CIRCLE_REGISTER_USE_CASE_TOKEN,
      useFactory: (
        circleRepository: ICircleRepository,
        circleFactory: ICircleFactory,
        circleMemberRepository: ICircleMemberRepository,
      ) => {
        const circleService = new CircleService(circleRepository);

        return new CircleRegisterInteractor(
          circleRepository,
          circleMemberRepository,
          circleFactory,
          circleService,
        );
      },
      inject: [
        CIRCLE_REPOSITORY_TOKEN,
        CIRCLE_FACTORY_TOKEN,
        CIRCLE_MEMBER_REPOSITORY_TOKEN,
      ],
    },

    {
      provide: CIRCLE_DELETE_USE_CASE_TOKEN,
      useFactory: (circleRepository: ICircleRepository) =>
        new CircleDeleteInteractor(circleRepository),
      inject: [CIRCLE_REPOSITORY_TOKEN],
    },

    {
      provide: CIRCLE_UPDATE_USE_CASE_TOKEN,
      useFactory: (circleRepository: ICircleRepository) => {
        const circleService = new CircleService(circleRepository);

        return new CircleUpdateInteractor(circleRepository, circleService);
      },
      inject: [CIRCLE_REPOSITORY_TOKEN],
    },

    {
      provide: CIRCLE_GET_CANDIDATES_USE_CASE_TOKEN,
      useFactory: (
        circleRepository: ICircleRepository,
        circleMemberRepository: ICircleMemberRepository,
      ) =>
        new CircleGetCandidatesQueryService(
          circleRepository,
          circleMemberRepository,
        ),
      inject: [CIRCLE_REPOSITORY_TOKEN, CIRCLE_MEMBER_REPOSITORY_TOKEN],
    },

    {
      provide: CIRCLE_ACCEPT_MEMBER_USE_CASE_TOKEN,
      useFactory: (
        circleRepository: ICircleRepository,
        circleMemberRepository: ICircleMemberRepository,
      ) =>
        new CircleAcceptMemberInteractor(
          circleRepository,
          circleMemberRepository,
        ),
      inject: [CIRCLE_REPOSITORY_TOKEN, CIRCLE_MEMBER_REPOSITORY_TOKEN],
    },

    {
      provide: CIRCLE_EXCEPT_MEMBER_USE_CASE_TOKEN,
      useFactory: (
        circleRepository: ICircleRepository,
        circleMemberRepository: ICircleMemberRepository,
      ) =>
        new CircleExceptMemberInteractor(
          circleRepository,
          circleMemberRepository,
        ),
      inject: [CIRCLE_REPOSITORY_TOKEN, CIRCLE_MEMBER_REPOSITORY_TOKEN],
    },
  ],
  exports: [
    CIRCLE_GET_USE_CASE_TOKEN,
    CIRCLE_FIND_ALL_USE_CASE_TOKEN,
    CIRCLE_REGISTER_USE_CASE_TOKEN,
    CIRCLE_DELETE_USE_CASE_TOKEN,
    CIRCLE_UPDATE_USE_CASE_TOKEN,
    CIRCLE_GET_CANDIDATES_USE_CASE_TOKEN,
    CIRCLE_ACCEPT_MEMBER_USE_CASE_TOKEN,
    CIRCLE_EXCEPT_MEMBER_USE_CASE_TOKEN,
  ],
})
export class CirclesFeatureModule {}
