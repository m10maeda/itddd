import { UserUpdateInteractor } from '../../../../src/features/users/application/interactors';
import {
  UserUpdateRequest,
  CanNotRegisterUserException,
  UserNotFoundException,
} from '../../../../src/features/users/application/usecases';
import {
  User,
  UserId,
  UserName,
  UserType,
  UserService,
  IUserRepository,
} from '../../../../src/features/users/domain';
import { InMemoryUserRepository } from '../../../../src/features/users/infrastructure';

describe('UserUpdateInteractor', () => {
  let userRepository: IUserRepository;
  let userService: UserService;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository([
      new User(new UserId('0'), new UserName('Alice'), UserType.Premium),
      new User(new UserId('1'), new UserName('Bob'), UserType.Normal),
    ]);

    userService = new UserService(userRepository);
  });

  it('should update the user name of the specified id to the specified name, when the user exists and the name does not exist', async () => {
    const interactor = new UserUpdateInteractor(userRepository, userService);

    const request = new UserUpdateRequest('0', 'Carol');

    await interactor.handle(request);

    const actual = await userRepository.findBy(new UserId('0'));

    expect(actual?.name.equals(new UserName('Carol'))).toBeTrue();
  });

  describe('should throw the error', () => {
    it('when the user with the specified id does not exist', async () => {
      const interactor = new UserUpdateInteractor(userRepository, userService);

      const request = new UserUpdateRequest('non-existent', 'Carol');

      await expect(interactor.handle(request)).rejects.toThrow(
        UserNotFoundException,
      );
    });

    it('when the specified name already exists', async () => {
      const interactor = new UserUpdateInteractor(userRepository, userService);

      const request = new UserUpdateRequest('0', 'Bob');

      await expect(interactor.handle(request)).rejects.toThrow(
        CanNotRegisterUserException,
      );
    });
  });
});
