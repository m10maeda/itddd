import {
  CircleId,
  ICircleEventPublisher,
  ICircleRepository,
} from '../../domain/models/circle';
import {
  IMemberExistenceService,
  Member,
  MemberId,
} from '../../domain/models/member';
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

  private readonly eventPublisher: ICircleEventPublisher;

  private readonly memberExistenceService: IMemberExistenceService;

  public async handle(
    input: ChangeOwnerUseCaseInputData,
  ): Promise<ChangeOwnerUseCaseOutputData> {
    const id = new CircleId(input.id);
    const circle = await this.circleRepository.getBy(id);

    if (circle === undefined) throw new CircleNotFoundException(id.toString());

    const newOwner = new Member(new MemberId(input.owner));

    if (!(await this.memberExistenceService.exists(newOwner)))
      throw new MemberNotFoundException(newOwner.id.toString());

    const event = circle.changeOwnerTo(newOwner);

    await this.eventPublisher.publish(event);

    return new ChangeOwnerUseCaseOutputData();
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
