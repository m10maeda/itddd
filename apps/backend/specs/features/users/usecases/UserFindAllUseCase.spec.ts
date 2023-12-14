import { PageInfo } from '../../../../src/features/shared/application/usecase';
import {
  UserData,
  UserFindAllRequest,
  UserFindAllResponse,
  UserFindCriteria,
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
  UserFindAllQueryService,
} from '../../../../src/features/users/infrastructure';
import { UserSpecificationBuilder } from '../../../../src/features/users/infrastructure/query-services/specifications';

describe('UserFindAllUseCase', () => {
  let userRepository: IUserRepository;
  let mockUsers: User[];

  beforeEach(() => {
    mockUsers = [
      new User(new UserId('0'), new UserName('Alice'), UserType.Premium),
      new User(new UserId('1'), new UserName('Bob'), UserType.Normal),
      new User(new UserId('2'), new UserName('Carol'), UserType.Normal),
      new User(new UserId('3'), new UserName('Dave'), UserType.Normal),
      new User(new UserId('4'), new UserName('Ellen'), UserType.Normal),
      new User(new UserId('5'), new UserName('Frank'), UserType.Normal),
    ];
    userRepository = new InMemoryUserRepository(mockUsers);
  });

  it('should return expected response when criteria does not specify', async () => {
    const userSpecBuilder = new UserSpecificationBuilder();
    const interactor = new UserFindAllQueryService(
      userRepository,
      userSpecBuilder,
    );

    const request = new UserFindAllRequest(new UserFindCriteria());

    const actual = await interactor.handle(request);
    const expected = new UserFindAllResponse(
      [
        new UserData('0', 'Alice', UserType.Premium.toString()),
        new UserData('1', 'Bob', UserType.Normal.toString()),
        new UserData('2', 'Carol', UserType.Normal.toString()),
        new UserData('3', 'Dave', UserType.Normal.toString()),
        new UserData('4', 'Ellen', UserType.Normal.toString()),
        new UserData('5', 'Frank', UserType.Normal.toString()),
      ],
      mockUsers.length,
    );

    expect(actual).toEqual(expected);
  });

  it('should return expected response when criteria specify name query', async () => {
    const userSpecBuilder = new UserSpecificationBuilder();
    const interactor = new UserFindAllQueryService(
      userRepository,
      userSpecBuilder,
    );

    const request = new UserFindAllRequest(
      new UserFindCriteria({ query: 'Ali' }),
    );

    const actual = await interactor.handle(request);
    const expected = new UserFindAllResponse(
      [new UserData('0', 'Alice', UserType.Premium.toString())],
      1,
    );

    expect(actual).toEqual(expected);
  });

  it('should return expected response when criteria specify included ids', async () => {
    const userSpecBuilder = new UserSpecificationBuilder();
    const interactor = new UserFindAllQueryService(
      userRepository,
      userSpecBuilder,
    );

    const request = new UserFindAllRequest(
      new UserFindCriteria({ includeIds: ['0', '2'] }),
    );

    const actual = await interactor.handle(request);
    const expected = new UserFindAllResponse(
      [
        new UserData('0', 'Alice', UserType.Premium.toString()),
        new UserData('2', 'Carol', UserType.Normal.toString()),
      ],
      2,
    );

    expect(actual).toEqual(expected);
  });

  it('should return expected response when criteria specify excluded ids', async () => {
    const userSpecBuilder = new UserSpecificationBuilder();
    const interactor = new UserFindAllQueryService(
      userRepository,
      userSpecBuilder,
    );

    const request = new UserFindAllRequest(
      new UserFindCriteria({ excludeIds: ['0', '2', '4', '5'] }),
    );

    const actual = await interactor.handle(request);
    const expected = new UserFindAllResponse(
      [
        new UserData('1', 'Bob', UserType.Normal.toString()),
        new UserData('3', 'Dave', UserType.Normal.toString()),
      ],
      2,
    );

    expect(actual).toEqual(expected);
  });

  it('should return expected response when criteria specify included ids and page info', async () => {
    const userSpecBuilder = new UserSpecificationBuilder();
    const interactor = new UserFindAllQueryService(
      userRepository,
      userSpecBuilder,
    );

    const request = new UserFindAllRequest(
      new UserFindCriteria({ includeIds: ['0', '2', '3', '5'] }),
      new PageInfo(2, 2),
    );

    const actual = await interactor.handle(request);
    const expected = new UserFindAllResponse(
      [
        new UserData('3', 'Dave', UserType.Normal.toString()),
        new UserData('5', 'Frank', UserType.Normal.toString()),
      ],
      4,
    );

    expect(actual).toEqual(expected);
  });
});
