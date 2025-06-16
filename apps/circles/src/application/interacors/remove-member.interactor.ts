import { CircleId, type ICircleRepository } from '../../domain/models/circle';
import { Member, MemberId } from '../../domain/models/member';
import {
  RelationshipDeleted,
  type IRelationshipEventPublisher,
  type IRelationshipRepository,
} from '../../domain/models/relationship';
import {
  CircleNotFoundException,
  RelationshipNotFoundException,
} from '../use-case/exceptions';
import {
  type RemoveMemberUseCaseInputData,
  RemoveMemberUseCaseOutputData,
  IRemoveMemberUseCaseInputPort,
} from '../use-case/input-ports';

export class RemoveMemberInteractor implements IRemoveMemberUseCaseInputPort {
  private readonly circleRepository: ICircleRepository;

  private readonly eventPublisher: IRelationshipEventPublisher;

  private readonly relationshipRepository: IRelationshipRepository;

  public async handle(
    input: RemoveMemberUseCaseInputData,
  ): Promise<RemoveMemberUseCaseOutputData> {
    const id = new CircleId(input.id);
    const circle = await this.circleRepository.getBy(id);

    if (circle === undefined) throw new CircleNotFoundException(id.toString());

    const member = new Member(new MemberId(input.member));

    const relationship = await this.relationshipRepository.getBy(
      circle.id,
      member.id,
    );

    if (relationship === undefined)
      throw new RelationshipNotFoundException(circle.id, member.id);

    const event = new RelationshipDeleted(
      relationship.circleId,
      relationship.memberId,
    );

    await this.eventPublisher.publish(event);

    return new RemoveMemberUseCaseOutputData();
  }

  public constructor(
    eventPublisher: IRelationshipEventPublisher,
    circleRepository: ICircleRepository,
    relationshipRepository: IRelationshipRepository,
  ) {
    this.eventPublisher = eventPublisher;
    this.circleRepository = circleRepository;
    this.relationshipRepository = relationshipRepository;
  }
}
