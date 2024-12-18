import { CircleId, type ICircleRepository } from '../../domain/models/circle';
import { MemberId, type IMemberRepository } from '../../domain/models/member';
import {
  CreateMemberRelation,
  type IRelationEventPublisher,
} from '../../domain/models/relation';
import { MemberRelation } from '../../domain/models/relation/member-relation';
import { type RelationExistenceService } from '../../domain/services';
import {
  CanNotAddMemberException,
  CircleNotFoundException,
} from '../use-case/exceptions';
import { MemberNotFoundException } from '../use-case/exceptions/member-not-found.exception';
import {
  type AddMemberUseCaseInputData,
  AddMemberUseCaseOutputData,
  IAddMemberUseCaseInputPort,
} from '../use-case/input-ports';

export class AddMemberInteractor implements IAddMemberUseCaseInputPort {
  private readonly circleRepository: ICircleRepository;

  private readonly eventPublisher: IRelationEventPublisher;

  private readonly existenceService: RelationExistenceService;

  private readonly memberRepository: IMemberRepository;

  public async handle(
    input: AddMemberUseCaseInputData,
  ): Promise<AddMemberUseCaseOutputData> {
    const id = new CircleId(input.id);
    const circle = await this.circleRepository.getBy(id);

    if (circle === undefined) throw new CircleNotFoundException(id.toString());

    const memberId = new MemberId(input.member);
    const member = await this.memberRepository.getBy(memberId);

    if (member === undefined)
      throw new MemberNotFoundException(memberId.toString());

    const relation = new MemberRelation(id, memberId);

    if (await this.existenceService.exists(relation))
      throw new CanNotAddMemberException(
        relation.circle.toString(),
        relation.member.toString(),
      );

    const command = new CreateMemberRelation(relation, this.eventPublisher);

    await command.execute();

    return new AddMemberUseCaseOutputData();
  }

  public constructor(
    eventPublisher: IRelationEventPublisher,
    circleRepository: ICircleRepository,
    memberRepository: IMemberRepository,
    existenceService: RelationExistenceService,
  ) {
    this.eventPublisher = eventPublisher;
    this.circleRepository = circleRepository;
    this.memberRepository = memberRepository;
    this.existenceService = existenceService;
  }
}
