import { CircleId, ICircleRepository } from '../../domain/models';
import {
  CircleGetRequest,
  CircleGetResponse,
  ICircleGetUseCase,
  CircleData,
} from '../../usecases';
import { CircleNotFoundException } from '../CircleNotFoundException';

export class CircleGetInteractor implements ICircleGetUseCase {
  private readonly circleRepository: ICircleRepository;

  public async handle(request: CircleGetRequest): Promise<CircleGetResponse> {
    const id = new CircleId(request.id);
    const circle = await this.circleRepository.findBy(id);

    if (circle === undefined) {
      throw new CircleNotFoundException(id, 'Circle not found.');
    }

    const circleData = new CircleData(
      circle.id.toString(),
      circle.name.toString(),
      circle.owner.toString(),
      Array.from(circle.members).map((member) => member.toString()),
    );

    return new CircleGetResponse(circleData);
  }

  public constructor(circleRepository: ICircleRepository) {
    this.circleRepository = circleRepository;
  }
}
