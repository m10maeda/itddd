import { CircleId, ICircleRepository } from '../../domain/models/circle';
import {
  IMemberExistenceService,
  Member,
  MemberId,
} from '../../domain/models/member';
import {
  ChangeOwner,
  IRelationEventPublisher,
  IRelationRepository,
  OwnerRelation,
} from '../../domain/models/relation';
import {
  CircleNotFoundException,
  MemberNotFoundException,
  RelationNotFoundException,
} from '../use-case/exceptions';
import {
  type ChangeOwnerUseCaseInputData,
  ChangeOwnerUseCaseOutputData,
  IChangeOwnerUseCaseInputPort,
} from '../use-case/input-ports';

export class ChangeOwnerInteractor implements IChangeOwnerUseCaseInputPort {
  private readonly circleRepository: ICircleRepository;

  private readonly eventPublisher: IRelationEventPublisher;

  private readonly memberExistenceService: IMemberExistenceService;

  private readonly relationRepository: IRelationRepository;

  public async handle(
    input: ChangeOwnerUseCaseInputData,
  ): Promise<ChangeOwnerUseCaseOutputData> {
    const id = new CircleId(input.id);
    const circle = await this.circleRepository.getBy(id);

    if (circle === undefined) throw new CircleNotFoundException(id.toString());

    const newOwner = new Member(new MemberId(input.owner));

    if (!(await this.memberExistenceService.exists(newOwner)))
      throw new MemberNotFoundException(newOwner.id.toString());

    const newRelation = new OwnerRelation(circle.id, newOwner.id);
    const lastRelation = await this.relationRepository.getOwnerRelationBy(id);

    if (lastRelation === undefined)
      throw new RelationNotFoundException(
        id.toString(),
        newOwner.id.toString(),
      );

    const command = new ChangeOwner(
      newRelation,
      lastRelation,
      this.eventPublisher,
    );

    await command.execute();

    return new ChangeOwnerUseCaseOutputData();
  }

  public constructor(
    eventPublisher: IRelationEventPublisher,
    circleRepository: ICircleRepository,
    relationRepository: IRelationRepository,
    memberExistenceService: IMemberExistenceService,
  ) {
    this.eventPublisher = eventPublisher;
    this.circleRepository = circleRepository;
    this.relationRepository = relationRepository;
    this.memberExistenceService = memberExistenceService;
  }
}
