import { UserDeleteInteractor } from '../../../../src/features/users/application/interactors';
import {
  UserDeleteRequest,
  UserNotFoundException,
} from '../../../../src/features/users/application/usecases';
import {
  User,
  UserId,
  UserName,
  UserType,
  IUserRepository,
} from '../../../../src/features/users/domain';
import { InMemoryUserRepository } from '../../../../src/features/users/infrastructure';

describe('UserDeleteUseCase', () => {
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository([
      new User(new UserId('0'), new UserName('Alice'), UserType.Premium),
      new User(new UserId('1'), new UserName('Bob'), UserType.Normal),
    ]);
  });

  it('should delete the user with the specified id, when the user exists', async () => {
    const interactor = new UserDeleteInteractor(userRepository);

    const request = new UserDeleteRequest('0');

    await interactor.handle(request);

    const actual = await userRepository.findBy(new UserId('0'));

    expect(actual).toBeUndefined();
  });

  it('should throw the error, when the user with the specified id does not exist', async () => {
    const interactor = new UserDeleteInteractor(userRepository);

    const request = new UserDeleteRequest('non-existent');

    await expect(interactor.handle(request)).rejects.toThrow(
      UserNotFoundException,
    );
  });
});
