import { IUserRepository, UserId, UserName, UserService } from '../../domain';
import {
  CanNotRegisterUserException,
  IUserUpdateUseCase,
  UserNotFoundException,
  UserUpdateRequest,
  UserUpdateResponse,
} from '../usecases';

export class UserUpdateInteractor implements IUserUpdateUseCase {
  public async handle(request: UserUpdateRequest): Promise<UserUpdateResponse> {
    const id = new UserId(request.id);
    const user = await this.userRepository.findBy(id);

    if (user === undefined) throw new UserNotFoundException(id);

    const name = new UserName(request.name);
    user.renameTo(name);

    if (await this.userService.exists(user))
      throw new CanNotRegisterUserException(user);

    await this.userRepository.save(user);

    return new UserUpdateResponse();
  }

  public constructor(
    userRepository: IUserRepository,
    userService: UserService,
  ) {
    this.userRepository = userRepository;
    this.userService = userService;
  }

  private readonly userRepository: IUserRepository;

  private readonly userService: UserService;
}
