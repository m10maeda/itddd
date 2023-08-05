import { Test, TestingModule } from '@nestjs/testing';

import { RegisterUserInput, UpdateUserInput } from './dto';
import {
  CanNotRegisterUserError,
  UserDelete,
  UserNotFoundError,
  UserType,
} from './models';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import {
  ResponseError,
  UsersApi,
  UserTypeEnum as UserTypeEnumSchema,
  User as UserSchema,
} from '../../lib/backend-adapter/v1.0';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let userApi: UsersApi;

  function createUserSchema(props: Partial<UserSchema> = {}): UserSchema {
    return {
      id: '0',
      name: 'Alice',
      type: UserTypeEnumSchema.Normal,
      ...props,
    };
  }

  function createStubNotFoundResponseError(
    props: Partial<ResponseInit> = {},
  ): ResponseError {
    return new ResponseError(
      new Response(new ReadableStream(undefined), {
        status: 404,
        statusText: 'Not Found',
        ...props,
      }),
    );
  }

  function createStubBadRequestResponseError(
    props: Partial<ResponseInit> = {},
  ): ResponseError {
    return new ResponseError(
      new Response(new ReadableStream(undefined), {
        status: 400,
        statusText: 'Bad Request',
        ...props,
      }),
    );
  }

  class StubResponseError extends Error {}

  function createConflictResponseError(
    props: Partial<ResponseInit> = {},
  ): ResponseError {
    return new ResponseError(
      new Response(new ReadableStream(undefined), {
        status: 409,
        statusText: 'Conflict',
        ...props,
      }),
    );
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: 'UsersApiInterface', useClass: UsersApi },
        UsersResolver,
        UsersService,
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    userApi = module.get('UsersApiInterface');
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getBy method', () => {
    it('should return user model based on response obtained from users api', async () => {
      const stubResponse = createUserSchema({
        id: '1',
        name: 'Alice',
        type: UserTypeEnumSchema.Premium,
      });

      jest
        .spyOn(userApi, 'usersControllerGetBy')
        .mockResolvedValueOnce(stubResponse);

      const result = await resolver.getBy('1');

      const expected = expect.objectContaining<UserSchema>({
        id: '1',
        name: 'Alice',
        type: UserType.Premium,
      });

      expect(result).toEqual(expected);
    });

    it('should return UserNotFoundError, when users api response status code is 404', async () => {
      const stubError = createStubNotFoundResponseError();

      jest
        .spyOn(userApi, 'usersControllerGetBy')
        .mockRejectedValueOnce(stubError);

      const result = await resolver.getBy('1');

      const expected = expect.objectContaining<UserNotFoundError>({
        id: '1',
        message: expect.any(String),
      });

      expect(result).toEqual(expected);
    });

    it('should thorw StubResponseError, when users api response is unhandling error', async () => {
      const stubError = new StubResponseError();

      jest
        .spyOn(userApi, 'usersControllerGetBy')
        .mockRejectedValueOnce(stubError);

      await expect(resolver.getBy('1')).rejects.toThrow(StubResponseError);
    });
  });

  describe('getAll method', () => {
    it('should return all user model list based on response obtained from users api', async () => {
      const stubResponse = [
        createUserSchema({
          id: '0',
          name: 'Alice',
          type: UserTypeEnumSchema.Premium,
        }),
        createUserSchema({
          id: '1',
          name: 'Bob',
          type: UserTypeEnumSchema.Normal,
        }),
        createUserSchema({
          id: '2',
          name: 'Carol',
          type: UserTypeEnumSchema.Premium,
        }),
      ];

      jest
        .spyOn(userApi, 'usersControllerGetAll')
        .mockResolvedValueOnce(stubResponse);

      const result = await resolver.getAll();

      const expected = [
        expect.objectContaining<UserSchema>({
          id: '0',
          name: 'Alice',
          type: UserType.Premium,
        }),
        expect.objectContaining<UserSchema>({
          id: '1',
          name: 'Bob',
          type: UserType.Normal,
        }),
        expect.objectContaining<UserSchema>({
          id: '2',
          name: 'Carol',
          type: UserType.Premium,
        }),
      ];

      expect(result).toEqual(expected);
    });

    it('should thorw StubResponseError, when users api response is unhandling error', async () => {
      const stubError = new StubResponseError();

      jest
        .spyOn(userApi, 'usersControllerGetAll')
        .mockRejectedValueOnce(stubError);

      await expect(resolver.getAll()).rejects.toThrow(StubResponseError);
    });
  });

  describe('register method', () => {
    it('should return user model based on response obtained from users api', async () => {
      const stubResponse = createUserSchema({
        id: '1',
        name: 'Alice',
        type: UserTypeEnumSchema.Normal,
      });

      jest
        .spyOn(userApi, 'usersControllerRegister')
        .mockResolvedValueOnce(stubResponse);

      const result = await resolver.register(new RegisterUserInput('Alice'));

      const expected = expect.objectContaining<UserSchema>({
        id: '1',
        name: 'Alice',
        type: UserType.Normal,
      });

      expect(result).toEqual(expected);
    });

    it('should return CanNotRegisterUserError model, when users api response status code is 400', async () => {
      const stubError = createStubBadRequestResponseError();

      jest
        .spyOn(userApi, 'usersControllerRegister')
        .mockRejectedValueOnce(stubError);

      const expected = expect.objectContaining<CanNotRegisterUserError>({
        name: 'Alice',
        message: expect.any(String),
      });

      const result = await resolver.register(new RegisterUserInput('Alice'));

      expect(result).toEqual(expected);
    });

    it('should return CanNotRegisterUserError model, when users api response status code is 409', async () => {
      const stubError = createConflictResponseError();

      jest
        .spyOn(userApi, 'usersControllerRegister')
        .mockRejectedValueOnce(stubError);

      const result = await resolver.register(new RegisterUserInput('Alice'));

      const expected = expect.objectContaining({
        name: 'Alice',
        message: expect.any(String),
      });

      expect(result).toEqual(expected);
    });

    it('should thorw StubResponseError, when users api response is unhandling error', async () => {
      const stubError = new StubResponseError();

      jest
        .spyOn(userApi, 'usersControllerRegister')
        .mockRejectedValueOnce(stubError);

      await expect(
        resolver.register(new RegisterUserInput('Alice')),
      ).rejects.toThrow(StubResponseError);
    });
  });

  describe('delete method', () => {
    it('should return user delete model, when users api response status code is 204', async () => {
      jest.spyOn(userApi, 'usersControllerDelete').mockResolvedValueOnce();

      const result = await resolver.delete('1');

      const expected = expect.objectContaining<UserDelete>({
        id: '1',
        result: true,
      });

      expect(result).toEqual(expected);
    });

    it('should return user delete model, when users api response is unhandling error', async () => {
      const stubError = new StubResponseError();

      jest
        .spyOn(userApi, 'usersControllerDelete')
        .mockRejectedValueOnce(stubError);

      const result = await resolver.delete('1');

      const expected = expect.objectContaining<UserDelete>({
        id: '1',
        result: false,
      });

      expect(result).toEqual(expected);
    });

    it('should return UserNotFoundError, when users api response status code is 404', async () => {
      const stubError = createStubNotFoundResponseError();

      jest
        .spyOn(userApi, 'usersControllerDelete')
        .mockRejectedValueOnce(stubError);

      const result = await resolver.delete('1');

      const expected = expect.objectContaining<UserNotFoundError>({
        id: '1',
        message: expect.any(String),
      });

      expect(result).toEqual(expected);
    });
  });

  describe('update method', () => {
    it('should return user model based on response obtained from users api', async () => {
      const stubResponse = createUserSchema({
        id: '1',
        name: 'Alice',
        type: UserTypeEnumSchema.Normal,
      });

      jest
        .spyOn(userApi, 'usersControllerUpdate')
        .mockResolvedValueOnce(stubResponse);

      const result = await resolver.update('1', new UpdateUserInput('Bob'));

      const expected = expect.objectContaining({
        id: '1',
        name: 'Alice',
        type: UserType.Normal,
      });

      expect(result).toEqual(expected);
    });

    it('should return UserNotFoundError, when users api response status code is 404', async () => {
      const stubError = createStubNotFoundResponseError();

      jest
        .spyOn(userApi, 'usersControllerUpdate')
        .mockRejectedValueOnce(stubError);

      const result = await resolver.update('1', new UpdateUserInput('Bob'));

      const expected = expect.objectContaining<UserNotFoundError>({
        id: '1',
        message: expect.any(String),
      });

      expect(result).toEqual(expected);
    });

    it('should return CanNotRegisterUserError model, when users api response status code is 400', async () => {
      const stubError = createStubBadRequestResponseError();

      jest
        .spyOn(userApi, 'usersControllerUpdate')
        .mockRejectedValueOnce(stubError);

      const result = await resolver.update('1', new UpdateUserInput('Alice'));

      const expected = expect.objectContaining({
        name: 'Alice',
        message: expect.any(String),
      });

      expect(result).toEqual(expected);
    });

    it('should return CanNotRegisterUserError model, when users api response status code is 409', async () => {
      const stubError = createConflictResponseError();

      jest
        .spyOn(userApi, 'usersControllerUpdate')
        .mockRejectedValueOnce(stubError);

      const result = await resolver.update('1', new UpdateUserInput('Alice'));

      const expected = expect.objectContaining({
        name: 'Alice',
        message: expect.any(String),
      });

      expect(result).toEqual(expected);
    });

    it('should thorw StubResponseError, when users api response is unhandling error', async () => {
      const stubError = new StubResponseError();

      jest
        .spyOn(userApi, 'usersControllerUpdate')
        .mockRejectedValueOnce(stubError);

      await expect(
        resolver.update('1', new UpdateUserInput('Alice')),
      ).rejects.toThrow(StubResponseError);
    });
  });
});
