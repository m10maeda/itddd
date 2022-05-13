import { User, UserId, UserName, UserType } from '../../domain/models';
import { InMemoryUserRepository } from '../../infrastructure/persistence';
import { UserData, UserGetRequest } from '../../usecases';
import { UserNotFoundException } from '../UserNotFoundException';
import { UserGetInteractor } from './UserGetInteractor';

let userRepository: InMemoryUserRepository;

beforeEach(() => {
  userRepository = new InMemoryUserRepository([
    new User(new UserId('0'), new UserName('Alice'), UserType.Premium),
    new User(new UserId('1'), new UserName('Bob'), UserType.Normal),
  ]);
});

it('should return expected UserData', async () => {
  const interactor = new UserGetInteractor(userRepository);

  const request = new UserGetRequest('0');

  const actual = await interactor.handle(request);

  expect(actual.user).toEqual(new UserData('0', 'Alice'));
});

it('should thorw error when a non-existent id is requested', async () => {
  const interactor = new UserGetInteractor(userRepository);

  const request = new UserGetRequest('non-existent');

  await expect(interactor.handle(request)).rejects.toThrow(
    UserNotFoundException,
  );
});
