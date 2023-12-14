import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import {
  RegisterUserInput,
  UpdateUserInput,
  UserFindQuery,
  UserListResult,
} from './dto';
import { User as UserEntity, UserType } from './entities';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersFeatureModule } from '../../features/users';
import {
  CanNotRegisterUserException,
  UserData,
  UserFindAllResponse,
  UserGetResponse,
  UserNotFoundException,
} from '../../features/users/application/usecases';
import { User, UserId, UserName } from '../../features/users/domain';
import { PageInfoQuery } from '../shared/dto';

describe('UserController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [UsersFeatureModule],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll method', () => {
    it('should return an array of users', async () => {
      const response = new UserFindAllResponse(
        [
          new UserData('0', 'Alice', UserType.Normal),
          new UserData('1', 'Bob', UserType.Premium),
        ],
        10,
      );
      jest.spyOn(service, 'findAll').mockResolvedValue(response);

      const expected = new UserListResult(
        [
          new UserEntity('0', 'Alice', UserType.Normal),
          new UserEntity('1', 'Bob', UserType.Premium),
        ],
        10,
      );

      const result = await controller.findAllBy(
        new UserFindQuery(),
        new PageInfoQuery(),
      );

      expect(result).toEqual(expected);
    });
  });

  describe('getBy method', () => {
    it('should return user, when user service returns user', async () => {
      const id = '0';
      const response = new UserGetResponse(
        new UserData(id, 'Alice', UserType.Premium),
      );
      jest.spyOn(service, 'getBy').mockResolvedValue(response);

      const expected = new UserEntity(id, 'Alice', UserType.Premium);
      const result = await controller.getBy(id);

      expect(result).toEqual(expected);
    });

    it('should throw NotFoundException, when user service throw UserNotFoundException', async () => {
      const id = 'unexisting';
      jest
        .spyOn(service, 'getBy')
        .mockRejectedValue(new UserNotFoundException(new UserId(id)));

      await expect(controller.getBy(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('register method', () => {
    it('should throw BadRequestException, when user service throw RangeError', async () => {
      jest.spyOn(service, 'register').mockRejectedValue(new RangeError());

      await expect(
        controller.register(new RegisterUserInput('Bob')),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw ConflictException, when user service throw CanNotRegisterUserException', async () => {
      jest
        .spyOn(service, 'register')
        .mockRejectedValue(
          new CanNotRegisterUserException(
            new User(new UserId('0'), new UserName('Alice')),
          ),
        );

      await expect(
        controller.register(new RegisterUserInput('Bob')),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('update method', () => {
    it('should throw NotFoundException, when user service throw UserNotFoundException', async () => {
      const id = 'unexisting';
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new UserNotFoundException(new UserId(id)));

      await expect(
        controller.update(id, new UpdateUserInput('Bob')),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException, when user service throw RangeError', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new RangeError());

      await expect(
        controller.update('0', new UpdateUserInput('Bob')),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw ConflictException, when user service throw CanNotRegisterUserException', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(
          new CanNotRegisterUserException(
            new User(new UserId('0'), new UserName('Alice')),
          ),
        );

      await expect(
        controller.update('0', new UpdateUserInput('Bob')),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('delete method', () => {
    it('should throw NotFoundException, when user service throw UserNotFoundException', async () => {
      const id = 'unexisting';
      jest
        .spyOn(service, 'delete')
        .mockRejectedValue(new UserNotFoundException(new UserId(id)));

      await expect(controller.delete(id)).rejects.toThrow(NotFoundException);
    });
  });
});
