import { IUserRepository, UserId, UserName } from '../../domain/models';
import { UserService } from '../../domain/services';
import {
  IUserUpdateUseCase,
  UserUpdateRequest,
  UserUpdateResponse,
} from '../../usecases';
import { CanNotRegisterUserException } from '../CanNotRegisterUserException';
import { UserNotFoundException } from '../UserNotFoundException';

export class UserUpdateInteractor implements IUserUpdateUseCase {
  public async handle(request: UserUpdateRequest): Promise<UserUpdateResponse> {
    const id = new UserId(request.id);
    const user = await this.userRepository.findBy(id);

    if (user === undefined) {
      throw new UserNotFoundException(id, `User not found.`);
    }

    const name = new UserName(request.name);
    user.renameTo(name);

    if (await this.userService.exists(user)) {
      throw new CanNotRegisterUserException(user, 'User already exists.');
    }

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
