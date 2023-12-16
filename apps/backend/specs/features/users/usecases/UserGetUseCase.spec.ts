import {
  UserData,
  UserType as UserTypeData,
  UserGetRequest,
  UserNotFoundException,
  UserGetResponse,
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
  UserGetQueryService,
} from '../../../../src/features/users/infrastructure';

describe('UserGetUseCase', () => {
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository([
      new User(new UserId('0'), new UserName('Alice'), UserType.Premium),
      new User(new UserId('1'), new UserName('Bob'), UserType.Normal),
    ]);
  });

  it('should return expected responce with the specified id, when the user exists', async () => {
    const interactor = new UserGetQueryService(userRepository);

    const request = new UserGetRequest('0');

    const actual = await interactor.handle(request);

    expect(actual).toEqual(
      new UserGetResponse(new UserData('0', 'Alice', UserTypeData.Premium)),
    );
  });

  it('should throw the error, when the user with the specified id does not exist', async () => {
    const interactor = new UserGetQueryService(userRepository);

    const request = new UserGetRequest('non-existent');

    await expect(interactor.handle(request)).rejects.toThrow(
      UserNotFoundException,
    );
  });
});
