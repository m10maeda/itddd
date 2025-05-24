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
import {
  CircleNotFoundException,
  MemberNotFoundException,
} from '../use-case/exceptions';
import {
  type RemoveMemberUseCaseInputData,
  RemoveMemberUseCaseOutputData,
  IRemoveMemberUseCaseInputPort,
} from '../use-case/input-ports';

export class RemoveMemberInteractor implements IRemoveMemberUseCaseInputPort {
  private readonly circleRepository: ICircleRepository;

  private readonly eventPublisher: ICircleEventPublisher;

  private readonly memberExistenceService: IMemberExistenceService;

  public async handle(
    input: RemoveMemberUseCaseInputData,
  ): Promise<RemoveMemberUseCaseOutputData> {
    const id = new CircleId(input.id);
    const circle = await this.circleRepository.getBy(id);

    if (circle === undefined) throw new CircleNotFoundException(id.toString());

    const member = new Member(new MemberId(input.member));

    if (!(await this.memberExistenceService.exists(member)))
      throw new MemberNotFoundException(member.id.toString());

    const event = circle.remove(member);

    await this.eventPublisher.publish(event);

    return new RemoveMemberUseCaseOutputData();
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
