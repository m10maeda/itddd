import { IUserRepository } from '../../domain/models';
import {
  IUserGetAllUseCase,
  UserGetAllRequest,
  UserGetAllResponse,
  UserData,
} from '../../usecases';

export class UserGetAllInteractor implements IUserGetAllUseCase {
  public async handle(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: UserGetAllRequest,
  ): Promise<UserGetAllResponse> {
    const users = await this.userRepository.findAll();

    return new UserGetAllResponse(
      Array.from(users).map(
        (user) => new UserData(user.id.toString(), user.name.toString()),
      ),
    );
  }

  public constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  private readonly userRepository: IUserRepository;
}
