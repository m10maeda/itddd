import { IUserRepository, UserId } from '../../domain/models';
import {
  IUserGetUseCase,
  UserData,
  UserGetRequest,
  UserGetResponse,
} from '../../usecases';
import { UserNotFoundException } from '../UserNotFoundException';

export class UserGetInteractor implements IUserGetUseCase {
  public async handle(request: UserGetRequest): Promise<UserGetResponse> {
    const id = new UserId(request.id);
    const user = await this.userRepository.findBy(id);

    if (user === undefined) {
      throw new UserNotFoundException(id, `User not found.`);
    }

    const data = new UserData(user.id.toString(), user.name.toString());

    return new UserGetResponse(data);
  }

  public constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  private readonly userRepository: IUserRepository;
}
