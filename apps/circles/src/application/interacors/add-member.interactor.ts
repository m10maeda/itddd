import {
  CircleId,
  ICircleEventPublisher,
  type ICircleRepository,
} from '../../domain/models/circle';
import {
  Member,
  MemberId,
  type IMemberExistenceService,
} from '../../domain/models/member';
import { CircleNotFoundException } from '../use-case/exceptions';
import { MemberNotFoundException } from '../use-case/exceptions/member-not-found.exception';
import {
  type AddMemberUseCaseInputData,
  AddMemberUseCaseOutputData,
  IAddMemberUseCaseInputPort,
} from '../use-case/input-ports';

export class AddMemberInteractor implements IAddMemberUseCaseInputPort {
  private readonly circleRepository: ICircleRepository;

  private readonly eventPublisher: ICircleEventPublisher;

  private readonly memberExistenceService: IMemberExistenceService;

  public async handle(
    input: AddMemberUseCaseInputData,
  ): Promise<AddMemberUseCaseOutputData> {
    const id = new CircleId(input.id);
    const circle = await this.circleRepository.getBy(id);

    if (circle === undefined) throw new CircleNotFoundException(id.toString());

    const member = new Member(new MemberId(input.member));

    if (!(await this.memberExistenceService.exists(member)))
      throw new MemberNotFoundException(member.id.toString());

    const event = circle.add(member);

    await this.eventPublisher.publish(event);

    return new AddMemberUseCaseOutputData();
  }

  public constructor(
    eventPublisher: ICircleEventPublisher,
    circleRepository: ICircleRepository,
    memberExistenceService: IMemberExistenceService,
  ) {
    this.eventPublisher = eventPublisher;
    this.circleRepository = circleRepository;
    this.memberExistenceService = memberExistenceService;
  }
}
