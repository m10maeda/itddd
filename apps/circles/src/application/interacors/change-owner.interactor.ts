import { CircleId, ICircleRepository } from '../../domain/models/circle';
import {
  IMemberExistenceService,
  Member,
  MemberId,
} from '../../domain/models/member';
import {
  IRelationshipEventPublisher,
  IRelationshipRepository,
  RelationshipCreated,
  RelationshipDeleted,
  Role,
} from '../../domain/models/relationship';
import {
  CircleNotFoundException,
  MemberNotFoundException,
} from '../use-case/exceptions';
import {
  type ChangeOwnerUseCaseInputData,
  ChangeOwnerUseCaseOutputData,
  IChangeOwnerUseCaseInputPort,
} from '../use-case/input-ports';

export class ChangeOwnerInteractor implements IChangeOwnerUseCaseInputPort {
  private readonly circleRepository: ICircleRepository;

  private readonly eventPublisher: IRelationshipEventPublisher;

  private readonly memberExistenceService: IMemberExistenceService;

  private readonly relationshipRepository: IRelationshipRepository;

  public async handle(
    input: ChangeOwnerUseCaseInputData,
  ): Promise<ChangeOwnerUseCaseOutputData> {
    const id = new CircleId(input.id);
    const circle = await this.circleRepository.getBy(id);

    if (circle === undefined) throw new CircleNotFoundException(id.toString());

    const newOwner = new Member(new MemberId(input.owner));

    if (!(await this.memberExistenceService.exists(newOwner)))
      throw new MemberNotFoundException(newOwner.id.toString());

    const currentOwnerRelationship =
      await this.relationshipRepository.getOwnerBy(circle.id);

    if (currentOwnerRelationship !== undefined) {
      if (
        !(await this.memberExistenceService.exists(
          new Member(currentOwnerRelationship.memberId),
        ))
      ) {
        const currentOwnerDeletedEvent = new RelationshipDeleted(
          currentOwnerRelationship.circleId,
          currentOwnerRelationship.memberId,
        );

        await this.eventPublisher.publish(currentOwnerDeletedEvent);
      } else {
        const currentOwnerChangedMemberEvent = currentOwnerRelationship.change(
          Role.Member,
        );

        await this.eventPublisher.publish(currentOwnerChangedMemberEvent);
      }
    }

    const newOwnerRelationship = await this.relationshipRepository.getBy(
      circle.id,
      newOwner.id,
    );

    const newOwnerAssignedEvent =
      newOwnerRelationship !== undefined
        ? newOwnerRelationship.change(Role.Owner)
        : new RelationshipCreated(circle.id, newOwner.id, Role.Owner);

    await this.eventPublisher.publish(newOwnerAssignedEvent);

    return new ChangeOwnerUseCaseOutputData();
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
