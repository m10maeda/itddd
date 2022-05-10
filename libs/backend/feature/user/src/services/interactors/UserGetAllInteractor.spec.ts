import { User, UserId, UserName, UserType } from '../../domain/models';
import { InMemoryUserRepository } from '../../infrastructure/persistence';
import { UserData, UserGetAllRequest } from '../../usecases';
import { UserGetAllInteractor } from './UserGetAllInteractor';

let userRepository: InMemoryUserRepository;

beforeEach(() => {
  userRepository = new InMemoryUserRepository([
    new User(new UserId('0'), new UserName('Alice'), UserType.Premium),
    new User(new UserId('1'), new UserName('Bob'), UserType.Normal),
  ]);
});

it('should return expected iterable UserData', async () => {
  const interactor = new UserGetAllInteractor(userRepository);

  const request = new UserGetAllRequest();

  const actual = await interactor.handle(request);

  expect(actual.users).toEqual([
    new UserData('0', 'Alice'),
    new UserData('1', 'Bob'),
  ]);
});
