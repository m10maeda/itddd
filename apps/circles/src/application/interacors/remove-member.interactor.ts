import { CircleId, type ICircleRepository } from '../../domain/models/circle';
import {
  Member,
  MemberId,
  type IMemberExistenceService,
} from '../../domain/models/member';
import {
  DeleteRelation,
  type IRelationRepository,
  type IRelationEventPublisher,
} from '../../domain/models/relation';
import {
  CircleNotFoundException,
  MemberNotFoundException,
  RelationNotFoundException,
} from '../use-case/exceptions';
import {
  type RemoveMemberUseCaseInputData,
  RemoveMemberUseCaseOutputData,
  IRemoveMemberUseCaseInputPort,
} from '../use-case/input-ports';

export class RemoveMemberInteractor implements IRemoveMemberUseCaseInputPort {
  private readonly circleRepository: ICircleRepository;

  private readonly eventPublisher: IRelationEventPublisher;

  private readonly memberExistenceService: IMemberExistenceService;

  private readonly relationRepository: IRelationRepository;

  public async handle(
    input: RemoveMemberUseCaseInputData,
  ): Promise<RemoveMemberUseCaseOutputData> {
    const id = new CircleId(input.id);
    const circle = await this.circleRepository.getBy(id);

    if (circle === undefined) throw new CircleNotFoundException(id.toString());

    const member = new Member(new MemberId(input.member));

    if (!(await this.memberExistenceService.exists(member)))
      throw new MemberNotFoundException(member.id.toString());

    const relation = await this.relationRepository.getBy(circle.id, member.id);

    if (relation === undefined)
      throw new RelationNotFoundException(id.toString(), member.id.toString());

    const command = new DeleteRelation(relation, this.eventPublisher);

    await command.execute();

    return new RemoveMemberUseCaseOutputData();
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
