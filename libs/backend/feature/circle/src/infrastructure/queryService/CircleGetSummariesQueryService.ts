import { IUserRepository } from '@itddd/backend-feature-user';

import { ICircleRepository } from '../../domain/models';
import {
  CircleGetSummariesRequest,
  CircleGetSummariesResponse,
  CircleSummaryData,
  ICircleGetSummariesUseCase,
} from '../../usecases';

export class CircleGetSummariesQueryService
  implements ICircleGetSummariesUseCase
{
  public async handle(
    request: CircleGetSummariesRequest,
  ): Promise<CircleGetSummariesResponse> {
    const { page, size } = request;

    if (page < 1 || size < 1) throw new RangeError();

    const all = await this.circleRepository.findAll();
    const chunk = Array.from(all).slice((page - 1) * size, page * size);

    const summaries = await Promise.all(
      chunk.map(async (circle) => {
        const owner = await this.userRepository.findBy(circle.owner);

        return new CircleSummaryData(
          circle.id.toString(),
          circle.name.toString(),
          owner.name.toString(),
        );
      }),
    );

    return new CircleGetSummariesResponse(summaries);
  }

  public constructor(
    circleRepository: ICircleRepository,
    userRepository: IUserRepository,
  ) {
    this.circleRepository = circleRepository;
    this.userRepository = userRepository;
  }

  private readonly circleRepository: ICircleRepository;

  private readonly userRepository: IUserRepository;
}
