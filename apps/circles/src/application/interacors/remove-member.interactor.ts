import { CircleId, type ICircleRepository } from '../../domain/models/circle';
import { MemberId, type IMemberRepository } from '../../domain/models/member';
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

  private readonly memberRepository: IMemberRepository;

  private readonly relationRepository: IRelationRepository;

  public async handle(
    input: RemoveMemberUseCaseInputData,
  ): Promise<RemoveMemberUseCaseOutputData> {
    const id = new CircleId(input.id);
    const circle = await this.circleRepository.getBy(id);

    if (circle === undefined) throw new CircleNotFoundException(id.toString());

    const memberId = new MemberId(input.member);
    const member = await this.memberRepository.getBy(memberId);

    if (member === undefined)
      throw new MemberNotFoundException(memberId.toString());

    const relation = await this.relationRepository.getBy(circle.id, member.id);

    if (relation === undefined)
      throw new RelationNotFoundException(id.toString(), memberId.toString());

    const command = new DeleteRelation(relation, this.eventPublisher);

    await command.execute();

    return new RemoveMemberUseCaseOutputData();
  }

  public constructor(
    eventPublisher: IRelationEventPublisher,
    circleRepository: ICircleRepository,
    relationRepository: IRelationRepository,
    memberRepository: IMemberRepository,
  ) {
    this.eventPublisher = eventPublisher;
    this.circleRepository = circleRepository;
    this.relationRepository = relationRepository;
    this.memberRepository = memberRepository;
  }
}
