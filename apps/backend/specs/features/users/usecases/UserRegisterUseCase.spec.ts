import { InMemorySerialNumberAssigner } from '../../../../src/features/shared/infrastructure';
import { UserRegisterInteractor } from '../../../../src/features/users/application/interactors';
import {
  UserRegisterRequest,
  CanNotRegisterUserException,
} from '../../../../src/features/users/application/usecases';
import {
  User,
  UserId,
  UserName,
  UserType,
  UserService,
  IUserFactory,
  IUserRepository,
} from '../../../../src/features/users/domain';
import {
  InMemoryUserRepository,
  InMemoryUserFactory,
} from '../../../../src/features/users/infrastructure';

describe('UserRegisterUseCase', () => {
  let userRepository: IUserRepository;
  let userFactory: IUserFactory;
  let userService: UserService;

  beforeEach(() => {
    const initializeUsers = [
      new User(new UserId('0'), new UserName('Alice'), UserType.Premium),
      new User(new UserId('1'), new UserName('Bob'), UserType.Normal),
    ];

    userRepository = new InMemoryUserRepository(initializeUsers);
    userFactory = new InMemoryUserFactory(
      new InMemorySerialNumberAssigner(initializeUsers.length),
    );
    userService = new UserService(userRepository);
  });

  it('should add the user with the specified name, when the specified user name does not exist', async () => {
    const interactor = new UserRegisterInteractor(
      userRepository,
      userFactory,
      userService,
    );

    const request = new UserRegisterRequest('Carol');

    expect(await userRepository.findAll()).toHaveLength(2);

    await interactor.handle(request);

    const actual = await userRepository.findBy(new UserName('Carol'));

    expect(await userRepository.findAll()).toHaveLength(3);
    expect(actual).toBeDefined();
  });

  it('should throw the error, when the specified user name already exists', async () => {
    const interactor = new UserRegisterInteractor(
      userRepository,
      userFactory,
      userService,
    );

    const request = new UserRegisterRequest('Alice');

    await expect(interactor.handle(request)).rejects.toThrow(
      CanNotRegisterUserException,
    );
  });
});
