import { User, UserId, UserName, UserType } from '../../domain/models';
import { UserService } from '../../domain/services';
import { InMemoryUserRepository } from '../../infrastructure/persistence';
import { UserUpdateRequest } from '../../usecases';
import { CanNotRegisterUserException } from '../CanNotRegisterUserException';
import { UserNotFoundException } from '../UserNotFoundException';
import { UserUpdateInteractor } from './UserUpdateInteractor';

let userRepository: InMemoryUserRepository;
let userService: UserService;

beforeEach(() => {
  userRepository = new InMemoryUserRepository([
    new User(new UserId('0'), new UserName('Alice'), UserType.Premium),
    new User(new UserId('1'), new UserName('Bob'), UserType.Normal),
  ]);

  userService = new UserService(userRepository);
});

it('should update user name', async () => {
  const interactor = new UserUpdateInteractor(userRepository, userService);

  const request = new UserUpdateRequest('0', 'Carol');

  await interactor.handle(request);

  const actual = await userRepository.findBy(new UserId('0'));

  expect(actual.name.equals(new UserName('Carol'))).toBe(true);
});

describe('should thorw error', () => {
  it('when a non-existent id is requested', async () => {
    const interactor = new UserUpdateInteractor(userRepository, userService);

    const request = new UserUpdateRequest('non-existent', 'Carol');

    await expect(interactor.handle(request)).rejects.toThrow(
      UserNotFoundException,
    );
  });

  it('when a existed name is requested', async () => {
    const interactor = new UserUpdateInteractor(userRepository, userService);

    const request = new UserUpdateRequest('0', 'Bob');

    await expect(interactor.handle(request)).rejects.toThrow(
      CanNotRegisterUserException,
    );
  });
});
