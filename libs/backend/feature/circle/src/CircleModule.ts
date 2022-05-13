import { IUserRepository, UserModule } from '@itddd/backend-feature-user';
import { Module } from '@nestjs/common';

import { ICircleFactory, ICircleRepository } from './domain/models';
import { CircleService } from './domain/services';
import {
  InfrastructureModule,
  CircleGetCandidatesQueryService,
  CircleGetSummariesQueryService,
} from './infrastructure';
import {
  CircleCreateInteractor,
  CircleDeleteInteractor,
  CircleGetAllInteractor,
  CircleGetInteractor,
  CircleJoinInteractor,
  CircleLeaveInteractor,
  CircleUpdateInteractor,
} from './services';

@Module({
  imports: [InfrastructureModule, UserModule],
  providers: [
    {
      provide: 'ICircleGetUseCase',
      useFactory: (circleRepository: ICircleRepository) =>
        new CircleGetInteractor(circleRepository),
      inject: ['ICircleRepository'],
    },
    {
      provide: 'ICircleGetAllUseCase',
      useFactory: (circleRepository: ICircleRepository) =>
        new CircleGetAllInteractor(circleRepository),
      inject: ['ICircleRepository'],
    },
    {
      provide: 'ICircleCreateUseCase',
      useFactory: (
        circleFactory: ICircleFactory,
        circleRepository: ICircleRepository,
        userRepository: IUserRepository,
      ) => {
        const circleService = new CircleService(circleRepository);

        return new CircleCreateInteractor(
          circleFactory,
          circleRepository,
          userRepository,
          circleService,
        );
      },
      inject: ['ICircleFactory', 'ICircleRepository', 'IUserRepository'],
    },
    {
      provide: 'ICircleDeleteUseCase',
      useFactory: (circleRepository: ICircleRepository) =>
        new CircleDeleteInteractor(circleRepository),
      inject: ['ICircleRepository'],
    },
    {
      provide: 'ICircleUpdateUseCase',
      useFactory: (circleRepository: ICircleRepository) => {
        const circleService = new CircleService(circleRepository);

        return new CircleUpdateInteractor(circleRepository, circleService);
      },
      inject: ['IUserRepository'],
    },
    {
      provide: 'ICircleJoinUseCase',
      useFactory: (
        circleRepository: ICircleRepository,
        userRepository: IUserRepository,
      ) => new CircleJoinInteractor(circleRepository, userRepository),
      inject: ['ICircleRepository', 'IUserRepository'],
    },
    {
      provide: 'ICircleLeaveUseCase',
      useFactory: (
        circleRepository: ICircleRepository,
        userRepository: IUserRepository,
      ) => new CircleLeaveInteractor(circleRepository, userRepository),
      inject: ['ICircleRepository', 'IUserRepository'],
    },
    {
      provide: 'ICircleGetCandidatesUseCase',
      useFactory: (
        circleRepository: ICircleRepository,
        userRepository: IUserRepository,
      ) =>
        new CircleGetCandidatesQueryService(circleRepository, userRepository),
      inject: ['ICircleRepository', 'IUserRepository'],
    },
    {
      provide: 'ICircleGetSummariesUseCase',
      useFactory: (
        circleRepository: ICircleRepository,
        userRepository: IUserRepository,
      ) => new CircleGetSummariesQueryService(circleRepository, userRepository),
      inject: ['ICircleRepository', 'IUserRepository'],
    },
  ],
  exports: [
    'ICircleGetUseCase',
    'ICircleGetAllUseCase',
    'ICircleCreateUseCase',
    'ICircleDeleteUseCase',
    'ICircleUpdateUseCase',
    'ICircleJoinUseCase',
    'ICircleLeaveUseCase',
    'ICircleGetCandidatesUseCase',
    'ICircleGetSummariesUseCase',
    InfrastructureModule,
  ],
})
export class CircleModule {}
