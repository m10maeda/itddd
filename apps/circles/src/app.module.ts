import { Module, type Provider, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

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
import {
  CircleDeleted,
  CircleRegistered,
  ICircleFactory,
  ICircleRepository,
} from './domain/models/circle';
import { IMemberRepository } from './domain/models/member';
import {
  ChangeOwnerOrDeleteCircleIfOwnerDeletedProcess,
  CreateOwnerRelationIfCircleRegisteredProcess,
  DeleteRelationIfCircleDeletedProcess,
  IRelationRepository,
  RelationDeleted,
} from './domain/models/relation';
import {
  CircleExistenceService,
  RelationExistenceService,
} from './domain/services';
import { CircleEventBus } from './infrastructure/event-bus/circle-event-bus';
import { RelationEventBus } from './infrastructure/event-bus/relation-event-bus';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import {
  CIRCLE_FACTORY,
  CIRCLE_REPOSITORY,
  MEMBER_REPOSITORY,
  RELATION_REPOSITORY,
} from './infrastructure/persistence/persistence.module';
import {
  FIND_ALL_CIRCLES_USE_CASE_INPUT_PORT,
  GET_CANDIDATES_USE_CASE_INPUT_PORT,
  GET_CIRCLE_USE_CASE_INPUT_PORT,
} from './infrastructure/query-service/query-service.module';
import { CircleController } from './presentation';
import { CircleService } from './presentation/circle.service';

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
  imports: [InfrastructureModule],
  providers: [
    {
      provide: CircleExistenceService,
      useFactory: (repository: ICircleRepository) =>
        new CircleExistenceService(repository),
      inject: [CIRCLE_REPOSITORY],
    } satisfies Provider<CircleExistenceService>,

    {
      provide: RelationExistenceService,
      useFactory: (repository: IRelationRepository) =>
        new RelationExistenceService(repository),
      inject: [RELATION_REPOSITORY],
    } satisfies Provider<RelationExistenceService>,

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
        circleRepository: ICircleRepository,
        memberRepository: IMemberRepository,
        eventBus: RelationEventBus,
        service: RelationExistenceService,
      ) =>
        new AddMemberInteractor(
          eventBus,
          circleRepository,
          memberRepository,
          service,
        ),
      inject: [
        CIRCLE_REPOSITORY,
        MEMBER_REPOSITORY,
        RelationEventBus,
        RelationExistenceService,
      ],
    } satisfies Provider<IAddMemberUseCaseInputPort>,

    {
      provide: REMOVE_MEMBER_USE_CASE_INPUT_PORT,
      useFactory: (
        circleRepository: ICircleRepository,
        relationRepository: IRelationRepository,
        memberRepository: IMemberRepository,
        eventBus: RelationEventBus,
      ) =>
        new RemoveMemberInteractor(
          eventBus,
          circleRepository,
          relationRepository,
          memberRepository,
        ),
      inject: [
        CIRCLE_REPOSITORY,
        RELATION_REPOSITORY,
        MEMBER_REPOSITORY,
        RelationEventBus,
      ],
    } satisfies Provider<IRemoveMemberUseCaseInputPort>,

    {
      provide: CHANGE_OWNER_USE_CASE_INPUT_PORT,
      useFactory: (
        circleRepository: ICircleRepository,
        relationRepository: IRelationRepository,
        memberRepository: IMemberRepository,
        eventBus: RelationEventBus,
      ) =>
        new ChangeOwnerInteractor(
          eventBus,
          circleRepository,
          relationRepository,
          memberRepository,
        ),
      inject: [
        CIRCLE_REPOSITORY,
        RELATION_REPOSITORY,
        MEMBER_REPOSITORY,
        RelationEventBus,
      ],
    } satisfies Provider<IChangeOwnerUseCaseInputPort>,

    {
      provide: CreateOwnerRelationIfCircleRegisteredProcess,
      useFactory: (
        relationEventBus: RelationEventBus,
        circleEventBus: CircleEventBus,
      ) => {
        const policy = new CreateOwnerRelationIfCircleRegisteredProcess(
          relationEventBus,
        );

        circleEventBus.subscribe(CircleRegistered, policy);

        return policy;
      },
      inject: [RelationEventBus, CircleEventBus],
    } satisfies Provider<CreateOwnerRelationIfCircleRegisteredProcess>,

    {
      provide: DeleteRelationIfCircleDeletedProcess,
      useFactory: (
        relationEventBus: RelationEventBus,
        relationRepository: IRelationRepository,
        circleEventBus: CircleEventBus,
      ) => {
        const policy = new DeleteRelationIfCircleDeletedProcess(
          relationEventBus,
          relationRepository,
        );

        circleEventBus.subscribe(CircleDeleted, policy);

        return policy;
      },
      inject: [RelationEventBus, RELATION_REPOSITORY, CircleEventBus],
    } satisfies Provider<DeleteRelationIfCircleDeletedProcess>,

    {
      provide: ChangeOwnerOrDeleteCircleIfOwnerDeletedProcess,
      useFactory: (
        circleRepository: ICircleRepository,
        relationRepository: IRelationRepository,
        circleEventBus: CircleEventBus,
        relationEventBus: RelationEventBus,
      ) => {
        const policy = new ChangeOwnerOrDeleteCircleIfOwnerDeletedProcess(
          relationEventBus,
          circleEventBus,
          relationRepository,
          circleRepository,
        );

        relationEventBus.subscribe(RelationDeleted, policy);

        return policy;
      },
      inject: [
        CIRCLE_REPOSITORY,
        RELATION_REPOSITORY,
        CircleEventBus,
        RelationEventBus,
      ],
    } satisfies Provider<ChangeOwnerOrDeleteCircleIfOwnerDeletedProcess>,

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
      ],
    } satisfies Provider<CircleService>,

    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    } satisfies Provider<ValidationPipe>,
  ],
  controllers: [CircleController],
})
export class AppModule {}
