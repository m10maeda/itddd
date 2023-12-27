import { ICircleRepository, CircleId } from '../../domain';
import {
  ICircleDeleteUseCase,
  CircleDeleteRequest,
  CircleDeleteResponse,
  CircleNotFoundException,
} from '../usecases';

export class CircleDeleteInteractor implements ICircleDeleteUseCase {
  public async handle(
    request: CircleDeleteRequest,
  ): Promise<CircleDeleteResponse> {
    const id = new CircleId(request.id);
    const circle = await this.circleRepository.findBy(id);

    if (circle === undefined) throw new CircleNotFoundException(id);

    await this.circleRepository.delete(circle);

    return new CircleDeleteResponse();
  }

  public constructor(circleRepository: ICircleRepository) {
    this.circleRepository = circleRepository;
  }

  private readonly circleRepository: ICircleRepository;
}
