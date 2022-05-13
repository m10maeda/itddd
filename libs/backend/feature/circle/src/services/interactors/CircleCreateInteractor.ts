import {
  IUserRepository,
  UserId,
  UserNotFoundException,
} from '@itddd/backend-feature-user';

import {
  CircleName,
  ICircleFactory,
  ICircleRepository,
} from '../../domain/models';
import { CircleService } from '../../domain/services';
import {
  CircleCreateRequest,
  CircleCreateResponse,
  ICircleCreateUseCase,
} from '../../usecases';
import { CanNotRegisterCircleException } from '../CanNotRegisterCircleException';

export class CircleCreateInteractor implements ICircleCreateUseCase {
  private readonly circleFactory: ICircleFactory;

  private readonly circleRepository: ICircleRepository;

  private readonly userRepository: IUserRepository;

  private readonly circleService: CircleService;

  public async handle(
    request: CircleCreateRequest,
  ): Promise<CircleCreateResponse> {
    const ownerId = new UserId(request.ownerId);
    const owner = await this.userRepository.findBy(ownerId);

    if (owner === undefined) {
      throw new UserNotFoundException(ownerId, 'User not found.');
    }

    const name = new CircleName(request.name);
    const circle = await this.circleFactory.create(name, owner);

    if (await this.circleService.exists(circle)) {
      throw new CanNotRegisterCircleException(circle, 'Ciecle already exists.');
    }

    this.circleRepository.save(circle);

    return new CircleCreateResponse(circle.id.toString());
  }

  public constructor(
    circleFactory: ICircleFactory,
    circleRepository: ICircleRepository,
    userRepository: IUserRepository,
    circleService: CircleService,
  ) {
    this.circleFactory = circleFactory;
    this.circleRepository = circleRepository;
    this.userRepository = userRepository;
    this.circleService = circleService;
  }
}
