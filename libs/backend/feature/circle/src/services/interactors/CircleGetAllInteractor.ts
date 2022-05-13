import { ICircleRepository } from '../../domain/models';
import {
  CircleGetAllRequest,
  CircleGetAllResponse,
  ICircleGetAllUseCase,
  CircleData,
} from '../../usecases';

export class CircleGetAllInteractor implements ICircleGetAllUseCase {
  private readonly circleRepository: ICircleRepository;

  public async handle(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: CircleGetAllRequest,
  ): Promise<CircleGetAllResponse> {
    const circles = await this.circleRepository.findAll();
    const circleData = Array.from(circles).map(
      (circle) =>
        new CircleData(
          circle.id.toString(),
          circle.name.toString(),
          circle.owner.toString(),
          Array.from(circle.members).map((member) => member.toString()),
        ),
    );

    return new CircleGetAllResponse(circleData);
  }

  public constructor(circleRepository: ICircleRepository) {
    this.circleRepository = circleRepository;
  }
}
