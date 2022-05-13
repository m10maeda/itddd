import { CircleId, ICircleRepository } from '../../domain/models';
import {
  CircleDeleteRequest,
  CircleDeleteResponse,
  ICircleDeleteUseCase,
} from '../../usecases';
import { CircleNotFoundException } from '../CircleNotFoundException';

export class CircleDeleteInteractor implements ICircleDeleteUseCase {
  private readonly circleRepository: ICircleRepository;

  public async handle(
    request: CircleDeleteRequest,
  ): Promise<CircleDeleteResponse> {
    const id = new CircleId(request.id);
    const circle = await this.circleRepository.findBy(id);

    if (circle === undefined) {
      throw new CircleNotFoundException(id, 'Ciecle not found.');
    }

    this.circleRepository.delete(circle);

    return new CircleDeleteResponse();
  }

  public constructor(circleRepository: ICircleRepository) {
    this.circleRepository = circleRepository;
  }
}
