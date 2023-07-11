import {
  IUserFactory,
  IUserRepository,
  UserName,
  UserService,
} from '../../domain';
import {
  CanNotRegisterUserException,
  IUserRegisterUseCase,
  UserRegisterRequest,
  UserRegisterResponse,
} from '../usecases';

export class UserRegisterInteractor implements IUserRegisterUseCase {
  public async handle(
    request: UserRegisterRequest,
  ): Promise<UserRegisterResponse> {
    const name = new UserName(request.name);
    const user = await this.userFactory.create(name);

    if (await this.userService.exists(user))
      throw new CanNotRegisterUserException(user);

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
