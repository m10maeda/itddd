import { IUserRepository, UserData } from '@itddd/backend-feature-user';

import { CircleId, ICircleRepository } from '../../domain/models';
import { CircleNotFoundException } from '../../services';
import {
  CircleGetCandidatesRequest,
  CircleGetCandidatesResponse,
  ICircleGetCandidatesUseCase,
} from '../../usecases';

export class CircleGetCandidatesQueryService
  implements ICircleGetCandidatesUseCase
{
  public async handle(
    request: CircleGetCandidatesRequest,
  ): Promise<CircleGetCandidatesResponse> {
    const id = new CircleId(request.id);
    const circle = await this.circleRepository.findBy(id);

    if (circle === undefined) {
      throw new CircleNotFoundException(id, 'Circle not found.');
    }

    const allUsers = await this.userRepository.findAll();

    const memberIds = Array.from(circle.members);

    const candidates = Array.from(allUsers).filter(
      (user) => !memberIds.some((memberId) => memberId.equals(user.id)),
    );

    return new CircleGetCandidatesResponse(
      Array.from(candidates).map(
        (candidate) =>
          new UserData(candidate.id.toString(), candidate.name.toString()),
      ),
    );
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
