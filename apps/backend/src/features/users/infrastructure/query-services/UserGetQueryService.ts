import {
  IUserGetUseCase,
  UserData,
  UserGetRequest,
  UserGetResponse,
  UserNotFoundException,
  UserType,
} from '../../application/usecases';
import { IUserRepository, UserId } from '../../domain';

export class UserGetQueryService implements IUserGetUseCase {
  public async handle(request: UserGetRequest): Promise<UserGetResponse> {
    const id = new UserId(request.id);
    const user = await this.userRepository.findBy(id);

    if (user === undefined) throw new UserNotFoundException(id);

    const data = new UserData(
      user.id.toString(),
      user.name.toString(),
      user.isPremium() ? UserType.Premium : UserType.Normal,
    );

    return new UserGetResponse(data);
  }

  public constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  private readonly userRepository: IUserRepository;
}
