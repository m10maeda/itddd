import { CircleId, CircleName, ICircleRepository } from '../../domain/models';
import { CircleService } from '../../domain/services';
import {
  CircleUpdateRequest,
  CircleUpdateResponse,
  ICircleUpdateUseCase,
} from '../../usecases';
import { CanNotRegisterCircleException } from '../CanNotRegisterCircleException';
import { CircleNotFoundException } from '../CircleNotFoundException';

export class CircleUpdateInteractor implements ICircleUpdateUseCase {
  public async handle(
    request: CircleUpdateRequest,
  ): Promise<CircleUpdateResponse> {
    const id = new CircleId(request.id);
    const circle = await this.circleRepository.findBy(id);

    if (circle === undefined) {
      throw new CircleNotFoundException(id, 'Ciecle not found');
    }

    const name = new CircleName(request.name);
    circle.renameTo(name);

    if (await this.circleService.exists(circle)) {
      throw new CanNotRegisterCircleException(circle, 'Circle already exists.');
    }

    this.circleRepository.save(circle);

    return new CircleUpdateResponse();
  }

  public constructor(
    circleRepository: ICircleRepository,
    circleService: CircleService,
  ) {
    this.circleRepository = circleRepository;
    this.circleService = circleService;
  }

  private readonly circleRepository: ICircleRepository;

  private readonly circleService: CircleService;
}
