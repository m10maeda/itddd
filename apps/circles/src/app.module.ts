import { HttpModule } from '@nestjs/axios';
import { Module, type Provider, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TerminusModule } from '@nestjs/terminus';
import { Partitioners } from 'kafkajs';

import { MemberDeletedHandler } from './application/event-handler';
import {
  AddMemberInteractor,
  ChangeOwnerInteractor,
  DeleteCircleInteractor,
  RegisterCircleInteractor,
  RemoveMemberInteractor,
  RenameCircleInteractor,
} from './application/interacors';
import {
  IAddMemberUseCaseInputPort,
  IChangeOwnerUseCaseInputPort,
  IDeleteCircleUseCaseInputPort,
  IFindAllCirclesUseCaseInputPort,
  IGetCandidatesUseCaseInputPort,
  IGetCircleUseCaseInputPort,
  IRegisterCircleUseCaseInputPort,
  IRemoveMemberUseCaseInputPort,
  IRenameCircleUseCaseInputPort,
} from './application/use-case/input-ports';
import { ICircleFactory, ICircleRepository } from './domain/models/circle';
import {
  IMemberDeletedHandler,
  IMemberExistenceService,
} from './domain/models/member';
import { CircleExistenceService } from './domain/services';
import { CircleEventBus } from './infrastructure/event-bus/circle-event-bus';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import {
  CIRCLE_FACTORY,
  CIRCLE_REPOSITORY,
  MEMBER_EXISTENCES_SERVICE,
} from './infrastructure/persistence/persistence.module';
import {
  FIND_ALL_CIRCLES_USE_CASE_INPUT_PORT,
  GET_CANDIDATES_USE_CASE_INPUT_PORT,
  GET_CIRCLE_USE_CASE_INPUT_PORT,
} from './infrastructure/query-service/query-service.module';
import { CircleController, KAFKA_CLIENT } from './presentation';
import { CircleService } from './presentation/circle.service';
import { HealthController } from './presentation/health/health.controller';

const REGISTER_CIRCLE_USE_CASE_INPUT_PORT = Symbol(
  'REGISTER_CIRCLE_USE_CASE_INPUT_PORT',
);
const RENAME_CIRCLE_USE_CASE_INPUT_PORT = Symbol(
  'RENAME_CIRCLE_USE_CASE_INPUT_PORT',
);
const DELETE_CIRCLE_USE_CASE_INPUT_PORT = Symbol(
  'DELETE_CIRCLE_USE_CASE_INPUT_PORT',
);
const ADD_MEMBER_USE_CASE_INPUT_PORT = Symbol('ADD_MEMBER_USE_CASE_INPUT_PORT');
const REMOVE_MEMBER_USE_CASE_INPUT_PORT = Symbol(
  'REMOVE_MEMBER_USE_CASE_INPUT_PORT',
);
const CHANGE_OWNER_USE_CASE_INPUT_PORT = Symbol(
  'CHANGE_OWNER_USE_CASE_INPUT_PORT',
);

@Module({
  imports: [
    InfrastructureModule,
    ClientsModule.register([
      {
        name: KAFKA_CLIENT,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'circles',
            brokers: [process.env.KAFKA_BROKER_URL ?? 'localhost:9094'],
          },
          consumer: {
            groupId: 'circles-consumer',
            allowAutoTopicCreation: true,
          },
          producer: {
            allowAutoTopicCreation: true,
            createPartitioner: Partitioners.DefaultPartitioner,
          },
        },
      },
    ]),
    TerminusModule,
    HttpModule,
  ],
  providers: [
    {
      provide: CircleExistenceService,
      useFactory: (repository: ICircleRepository) =>
        new CircleExistenceService(repository),
      inject: [CIRCLE_REPOSITORY],
    } satisfies Provider<CircleExistenceService>,

    {
      provide: REGISTER_CIRCLE_USE_CASE_INPUT_PORT,
      useFactory: (
        factory: ICircleFactory,
        service: CircleExistenceService,
        eventBus: CircleEventBus,
      ) => new RegisterCircleInteractor(factory, service, eventBus),
      inject: [CIRCLE_FACTORY, CircleExistenceService, CircleEventBus],
    } satisfies Provider<IRegisterCircleUseCaseInputPort>,

    {
      provide: RENAME_CIRCLE_USE_CASE_INPUT_PORT,
      useFactory: (
        repository: ICircleRepository,
        service: CircleExistenceService,
        eventBus: CircleEventBus,
      ) => new RenameCircleInteractor(repository, service, eventBus),
      inject: [CIRCLE_REPOSITORY, CircleExistenceService, CircleEventBus],
    } satisfies Provider<IRenameCircleUseCaseInputPort>,

    {
      provide: DELETE_CIRCLE_USE_CASE_INPUT_PORT,
      useFactory: (repository: ICircleRepository, eventBus: CircleEventBus) =>
        new DeleteCircleInteractor(repository, eventBus),
      inject: [CIRCLE_REPOSITORY, CircleEventBus],
    } satisfies Provider<IDeleteCircleUseCaseInputPort>,

    {
      provide: ADD_MEMBER_USE_CASE_INPUT_PORT,
      useFactory: (
        eventBus: CircleEventBus,
        circleRepository: ICircleRepository,
        memberExistenceService: IMemberExistenceService,
      ) =>
        new AddMemberInteractor(
          eventBus,
          circleRepository,
          memberExistenceService,
        ),
      inject: [CircleEventBus, CIRCLE_REPOSITORY, MEMBER_EXISTENCES_SERVICE],
    } satisfies Provider<IAddMemberUseCaseInputPort>,

    {
      provide: REMOVE_MEMBER_USE_CASE_INPUT_PORT,
      useFactory: (
        eventBus: CircleEventBus,
        circleRepository: ICircleRepository,
        memberExistenceService: IMemberExistenceService,
      ) =>
        new RemoveMemberInteractor(
          eventBus,
          circleRepository,
          memberExistenceService,
        ),
      inject: [CircleEventBus, CIRCLE_REPOSITORY, MEMBER_EXISTENCES_SERVICE],
    } satisfies Provider<IRemoveMemberUseCaseInputPort>,

    {
      provide: CHANGE_OWNER_USE_CASE_INPUT_PORT,
      useFactory: (
        eventBus: CircleEventBus,
        circleRepository: ICircleRepository,
        memberExistenceService: IMemberExistenceService,
      ) =>
        new ChangeOwnerInteractor(
          eventBus,
          circleRepository,
          memberExistenceService,
        ),
      inject: [CircleEventBus, CIRCLE_REPOSITORY, MEMBER_EXISTENCES_SERVICE],
    } satisfies Provider<IChangeOwnerUseCaseInputPort>,

    {
      provide: MemberDeletedHandler,
      useFactory: (
        circleRepository: ICircleRepository,
        removeMemberUseCase: IRemoveMemberUseCaseInputPort,
        changeOwnerUseCase: IChangeOwnerUseCaseInputPort,
        deleteUseCase: IDeleteCircleUseCaseInputPort,
      ) =>
        new MemberDeletedHandler(
          circleRepository,
          removeMemberUseCase,
          changeOwnerUseCase,
          deleteUseCase,
        ),
      inject: [
        CIRCLE_REPOSITORY,
        REMOVE_MEMBER_USE_CASE_INPUT_PORT,
        CHANGE_OWNER_USE_CASE_INPUT_PORT,
        DELETE_CIRCLE_USE_CASE_INPUT_PORT,
      ],
    } satisfies Provider<IMemberDeletedHandler>,

    {
      provide: CircleService,
      useFactory: (
        registerUseCase: IRegisterCircleUseCaseInputPort,
        getUseCase: IGetCircleUseCaseInputPort,
        findAllUseCase: IFindAllCirclesUseCaseInputPort,
        renameUseCase: IRenameCircleUseCaseInputPort,
        deleteUseCase: IDeleteCircleUseCaseInputPort,
        getCandidatesUseCase: IGetCandidatesUseCaseInputPort,
        addMemberUseCase: IAddMemberUseCaseInputPort,
        removeMemberUseCase: IRemoveMemberUseCaseInputPort,
        changeOwnerUseCase: IChangeOwnerUseCaseInputPort,
        memberDeletedHandler: MemberDeletedHandler,
      ) =>
        new CircleService(
          registerUseCase,
          getUseCase,
          findAllUseCase,
          renameUseCase,
          deleteUseCase,
          getCandidatesUseCase,
          addMemberUseCase,
          removeMemberUseCase,
          changeOwnerUseCase,
          memberDeletedHandler,
        ),
      inject: [
        REGISTER_CIRCLE_USE_CASE_INPUT_PORT,
        GET_CIRCLE_USE_CASE_INPUT_PORT,
        FIND_ALL_CIRCLES_USE_CASE_INPUT_PORT,
        RENAME_CIRCLE_USE_CASE_INPUT_PORT,
        DELETE_CIRCLE_USE_CASE_INPUT_PORT,
        GET_CANDIDATES_USE_CASE_INPUT_PORT,
        ADD_MEMBER_USE_CASE_INPUT_PORT,
        REMOVE_MEMBER_USE_CASE_INPUT_PORT,
        CHANGE_OWNER_USE_CASE_INPUT_PORT,
        MemberDeletedHandler,
      ],
    } satisfies Provider<CircleService>,

    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    } satisfies Provider<ValidationPipe>,
  ],
  controllers: [HealthController, CircleController],
})
export class AppModule {}
