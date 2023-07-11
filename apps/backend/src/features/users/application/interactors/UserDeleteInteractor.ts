import { IUserRepository, UserId } from '../../domain';
import {
  IUserDeleteUseCase,
  UserDeleteRequest,
  UserDeleteResponse,
  UserNotFoundException,
} from '../usecases';

export class UserDeleteInteractor implements IUserDeleteUseCase {
  public async handle(request: UserDeleteRequest): Promise<UserDeleteResponse> {
    const id = new UserId(request.id);
    const user = await this.userRepository.findBy(id);

    if (user === undefined) throw new UserNotFoundException(id);

    await this.userRepository.delete(user);

    return new UserDeleteResponse();
  }

  public constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  private readonly userRepository: IUserRepository;
}
