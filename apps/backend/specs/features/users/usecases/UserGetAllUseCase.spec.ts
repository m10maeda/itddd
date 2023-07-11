import {
  UserData,
  UserGetAllRequest,
  UserGetAllResponse,
} from '../../../../src/features/users/application/usecases';
import {
  User,
  UserId,
  UserName,
  UserType,
  IUserRepository,
} from '../../../../src/features/users/domain';
import {
  InMemoryUserRepository,
  UserGetAllQueryService,
} from '../../../../src/features/users/infrastructure';

describe('UserGetAllInteractor', () => {
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository([
      new User(new UserId('0'), new UserName('Alice'), UserType.Premium),
      new User(new UserId('1'), new UserName('Bob'), UserType.Normal),
    ]);
  });

  it('should return expected response', async () => {
    const interactor = new UserGetAllQueryService(userRepository);

    const request = new UserGetAllRequest();

    const actual = await interactor.handle(request);
    const expected = new UserGetAllResponse([
      new UserData('0', 'Alice', UserType.Premium.toString()),
      new UserData('1', 'Bob', UserType.Normal.toString()),
    ]);

    expect(actual).toEqual(expected);
  });
});
