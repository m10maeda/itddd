import { CircleId, type ICircleRepository } from '../../domain/models/circle';
import {
  Member,
  MemberId,
  type IMemberExistenceService,
} from '../../domain/models/member';
import {
  type IRelationshipEventPublisher,
  IRelationshipRepository,
  Relationship,
  RelationshipCreated,
} from '../../domain/models/relationship';
import {
  CircleNotFoundException,
  RelationshipAlreadyExistsException,
} from '../use-case/exceptions';
import { MemberNotFoundException } from '../use-case/exceptions/member-not-found.exception';
import {
  type AddMemberUseCaseInputData,
  AddMemberUseCaseOutputData,
  IAddMemberUseCaseInputPort,
} from '../use-case/input-ports';

export class AddMemberInteractor implements IAddMemberUseCaseInputPort {
  private readonly circleRepository: ICircleRepository;

  private readonly eventPublisher: IRelationshipEventPublisher;

  private readonly memberExistenceService: IMemberExistenceService;

  private readonly relationshipRepository: IRelationshipRepository;

  public async handle(
    input: AddMemberUseCaseInputData,
  ): Promise<AddMemberUseCaseOutputData> {
    const id = new CircleId(input.id);
    const circle = await this.circleRepository.getBy(id);

    if (circle === undefined) throw new CircleNotFoundException(id.toString());

    const member = new Member(new MemberId(input.member));

    if (!(await this.memberExistenceService.exists(member)))
      throw new MemberNotFoundException(member.id.toString());

    const relationship = Relationship.createMemberRelationshipOf(
      circle.id,
      member.id,
    );

    const duplicated = await this.relationshipRepository.getBy(
      relationship.circleId,
      relationship.memberId,
    );

    if (duplicated !== undefined)
      throw new RelationshipAlreadyExistsException(
        relationship.circleId,
        relationship.memberId,
      );

    const event = new RelationshipCreated(
      relationship.circleId,
      relationship.memberId,
      relationship.role,
    );

    await this.eventPublisher.publish(event);

    return new AddMemberUseCaseOutputData();
  }

  public constructor(
    eventPublisher: IRelationshipEventPublisher,
    circleRepository: ICircleRepository,
    relationshipRepository: IRelationshipRepository,
    memberExistenceService: IMemberExistenceService,
  ) {
    this.eventPublisher = eventPublisher;
    this.circleRepository = circleRepository;
    this.relationshipRepository = relationshipRepository;
    this.memberExistenceService = memberExistenceService;
  }
}
