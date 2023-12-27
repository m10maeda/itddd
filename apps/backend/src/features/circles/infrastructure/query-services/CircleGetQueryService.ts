import {
  CircleData,
  CircleGetRequest,
  CircleGetResponse,
  CircleNotFoundException,
  ICircleGetUseCase,
} from '../../application/usecases';
import { CircleId, ICircleRepository } from '../../domain';

export class CircleGetQueryService implements ICircleGetUseCase {
  public async handle(request: CircleGetRequest): Promise<CircleGetResponse> {
    const id = new CircleId(request.id);
    const circle = await this.circleRepository.findBy(id);

    if (circle === undefined) throw new CircleNotFoundException(id);

    const data = new CircleData(
      circle.id.toString(),
      circle.name.toString(),
      circle.owner.toString(),
      Array.from(circle.members).map((memberId) => memberId.toString()),
    );

    return new CircleGetResponse(data);
  }

  public constructor(circleRepository: ICircleRepository) {
    this.circleRepository = circleRepository;
  }

  private readonly circleRepository: ICircleRepository;
}
