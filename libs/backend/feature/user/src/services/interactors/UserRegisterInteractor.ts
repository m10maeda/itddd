import { IUserFactory, IUserRepository, UserName } from '../../domain/models';
import { UserService } from '../../domain/services';
import {
  IUserRegisterUseCase,
  UserRegisterRequest,
  UserRegisterResponse,
} from '../../usecases';
import { CanNotRegisterUserException } from '../CanNotRegisterUserException';

export class UserRegisterInteractor implements IUserRegisterUseCase {
  public async handle(
    request: UserRegisterRequest,
  ): Promise<UserRegisterResponse> {
    const name = new UserName(request.name);
    const user = await this.userFactory.create(name);

    if (await this.userService.exists(user)) {
      throw new CanNotRegisterUserException(user, 'User already exists.');
    }

    await this.userRepository.save(user);

    return new UserRegisterResponse(user.id.toString());
  }

  public constructor(
    userRepository: IUserRepository,
    userFactory: IUserFactory,
    userService: UserService,
  ) {
    this.userRepository = userRepository;
    this.userFactory = userFactory;
    this.userService = userService;
  }

  private readonly userRepository: IUserRepository;

  private readonly userFactory: IUserFactory;

  private readonly userService: UserService;
}
