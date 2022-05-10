import { InMemorySerialNumberAssigner } from '@itddd/backend-feature-shared';

import { User, UserId, UserName, UserType } from '../../domain/models';
import { UserService } from '../../domain/services';
import {
  InMemoryUserRepository,
  InMemoryUserFactory,
} from '../../infrastructure/persistence';
import { UserRegisterRequest } from '../../usecases';
import { CanNotRegisterUserException } from '../CanNotRegisterUserException';
import { UserRegisterInteractor } from './UserRegisterInteractor';

let userRepository: InMemoryUserRepository;
let userFactory: InMemoryUserFactory;
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

it('should add user', async () => {
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

it('should thorw error when a existed name is requested', async () => {
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
