import { User, UserId, UserName, UserType } from '../../domain/models';
import { InMemoryUserRepository } from '../../infrastructure/persistence';
import { UserDeleteRequest } from '../../usecases';
import { UserNotFoundException } from '../UserNotFoundException';
import { UserDeleteInteractor } from './UserDeleteInteractor';

let userRepository: InMemoryUserRepository;

beforeEach(() => {
  userRepository = new InMemoryUserRepository([
    new User(new UserId('0'), new UserName('Alice'), UserType.Premium),
    new User(new UserId('1'), new UserName('Bob'), UserType.Normal),
  ]);
});

it('should delete user', async () => {
  const interactor = new UserDeleteInteractor(userRepository);

  const request = new UserDeleteRequest('0');

  await interactor.handle(request);

  const actual = await userRepository.findBy(new UserId('0'));

  expect(actual).toBeUndefined();
});

it('should thorw error when a non-existent id is requested', async () => {
  const interactor = new UserDeleteInteractor(userRepository);

  const request = new UserDeleteRequest('non-existent');

  await expect(interactor.handle(request)).rejects.toThrow(
    UserNotFoundException,
  );
});
