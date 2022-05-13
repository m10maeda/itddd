import {
  IUserRepository,
  UserId,
  UserNotFoundException,
} from '@itddd/backend-feature-user';

import { CircleId, ICircleRepository } from '../../domain/models';
import {
  CircleLeaveRequest,
  CircleLeaveResponse,
  ICircleLeaveUseCase,
} from '../../usecases';
import { CircleNotFoundException } from '../CircleNotFoundException';

export class CircleLeaveInteractor implements ICircleLeaveUseCase {
  private readonly circleRepository: ICircleRepository;

  private readonly userRepository: IUserRepository;

  public async handle(
    request: CircleLeaveRequest,
  ): Promise<CircleLeaveResponse> {
    const memberId = new UserId(request.memberId);
    const member = await this.userRepository.findBy(memberId);

    if (member === undefined) {
      throw new UserNotFoundException(memberId, 'User not found.');
    }

    const id = new CircleId(request.circleId);
    const circle = await this.circleRepository.findBy(id);

    if (circle === undefined) {
      throw new CircleNotFoundException(id, 'Circle not found.');
    }

    circle.leave(member);

    this.circleRepository.save(circle);

    return new CircleLeaveResponse();
  }

  public constructor(
    circleRepository: ICircleRepository,
    userRepository: IUserRepository,
  ) {
    this.circleRepository = circleRepository;
    this.userRepository = userRepository;
  }
}
