import { IUserRepository, UserId } from '../../domain/models';
import {
  IUserDeleteUseCase,
  UserDeleteRequest,
  UserDeleteResponse,
} from '../../usecases';
import { UserNotFoundException } from '../UserNotFoundException';

export class UserDeleteInteractor implements IUserDeleteUseCase {
  public async handle(request: UserDeleteRequest): Promise<UserDeleteResponse> {
    const id = new UserId(request.id);
    const user = await this.userRepository.findBy(id);

    if (user === undefined) {
      throw new UserNotFoundException(id, `User not found.`);
    }

    await this.userRepository.delete(user);

    return new UserDeleteResponse();
  }

  public constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  private readonly userRepository: IUserRepository;
}
