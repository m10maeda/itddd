import {
  ICircleFactory,
  ICircleRepository,
  CircleName,
  CircleService,
  CircleMemberId,
  ICircleMemberRepository,
} from '../../domain';
import {
  CanNotRegisterCircleException,
  ICircleRegisterUseCase,
  CircleRegisterRequest,
  CircleRegisterResponse,
  CircleMemberNotFoundException,
} from '../usecases';

export class CircleRegisterInteractor implements ICircleRegisterUseCase {
  public async handle(
    request: CircleRegisterRequest,
  ): Promise<CircleRegisterResponse> {
    const name = new CircleName(request.name);
    const ownerId = new CircleMemberId(request.owner);

    const owner = await this.circleMemberRepository.findBy(ownerId);

    if (owner === undefined) throw new CircleMemberNotFoundException(ownerId);

    const circle = await this.circleFactory.create(name, owner);

    if (await this.circleService.exists(circle))
      throw new CanNotRegisterCircleException(circle);

    await this.circleRepository.save(circle);

    return new CircleRegisterResponse(circle.id.toString());
  }

  public constructor(
    circleRepository: ICircleRepository,
    circleMemberRepository: ICircleMemberRepository,
    circleFactory: ICircleFactory,
    circleService: CircleService,
  ) {
    this.circleRepository = circleRepository;
    this.circleMemberRepository = circleMemberRepository;
    this.circleFactory = circleFactory;
    this.circleService = circleService;
  }

  private readonly circleRepository: ICircleRepository;

  private readonly circleMemberRepository: ICircleMemberRepository;

  private readonly circleFactory: ICircleFactory;

  private readonly circleService: CircleService;
}
