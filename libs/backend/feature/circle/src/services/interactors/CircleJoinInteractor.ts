import {
  IUserRepository,
  UserId,
  UserNotFoundException,
} from '@itddd/backend-feature-user';

import {
  CircleFullException,
  CircleFullSpecification,
  CircleId,
  CircleMembers,
  ICircleRepository,
} from '../../domain/models';
import {
  CircleJoinRequest,
  CircleJoinResponse,
  ICircleJoinUseCase,
} from '../../usecases';
import { CircleNotFoundException } from '../CircleNotFoundException';

export class CircleJoinInteractor implements ICircleJoinUseCase {
  private readonly circleRepository: ICircleRepository;

  private readonly userRepository: IUserRepository;

  public async handle(request: CircleJoinRequest): Promise<CircleJoinResponse> {
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

    const fullSpec = new CircleFullSpecification();
    const owner = await this.userRepository.findBy(circle.owner);

    if (owner === undefined) {
      throw new UserNotFoundException(circle.owner, 'User not found.');
    }

    const members = await this.userRepository.findAllBy(circle.members);

    if (!fullSpec.isSatisfiedBy(new CircleMembers(owner, members))) {
      throw new CircleFullException(id, 'Circle member is full.');
    }

    circle.join(member);

    this.circleRepository.save(circle);

    return new CircleJoinResponse();
  }

  public constructor(
    circleRepository: ICircleRepository,
    userRepository: IUserRepository,
  ) {
    this.circleRepository = circleRepository;
    this.userRepository = userRepository;
  }
}
