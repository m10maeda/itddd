import { Inject, Injectable } from '@nestjs/common';

import { PageInfo } from '../../features/shared/application/usecase';
import {
  IUserDeleteUseCaseToken,
  IUserFindAllUseCaseToken,
  IUserGetUseCaseToken,
  IUserRegisterUseCaseToken,
  IUserUpdateUseCaseToken,
} from '../../features/users';
import {
  IUserDeleteUseCase,
  IUserFindAllUseCase,
  IUserGetUseCase,
  IUserRegisterUseCase,
  IUserUpdateUseCase,
  UserDeleteRequest,
  UserDeleteResponse,
  UserFindAllRequest,
  UserFindAllResponse,
  UserFindCriteria,
  UserGetRequest,
  UserGetResponse,
  UserRegisterRequest,
  UserRegisterResponse,
  UserUpdateRequest,
  UserUpdateResponse,
} from '../../features/users/application/usecases';

@Injectable()
export class UsersService {
  public async getBy(id: string): Promise<UserGetResponse> {
    const request = new UserGetRequest(id);

    return this.getUseCase.handle(request);
  }

  public async findAll(
    criteria?: {
      query?: string;
      includeIds?: string[];
      excludeIds?: string[];
    },
    pageInfo?: { page: number; size: number },
  ): Promise<UserFindAllResponse> {
    const request = new UserFindAllRequest(
      new UserFindCriteria(criteria),
      pageInfo ? new PageInfo(pageInfo.page, pageInfo.size) : undefined,
    );

    return this.findAllUseCase.handle(request);
  }

  public async register(name: string): Promise<UserRegisterResponse> {
    const request = new UserRegisterRequest(name);

    return this.registerUseCase.handle(request);
  }

  public async delete(id: string): Promise<UserDeleteResponse> {
    const request = new UserDeleteRequest(id);

    return this.deleteUseCase.handle(request);
  }

  public async update(id: string, name: string): Promise<UserUpdateResponse> {
    const request = new UserUpdateRequest(id, name);

    return this.updateUseCase.handle(request);
  }

  public constructor(
    @Inject(IUserGetUseCaseToken) getUseCase: IUserGetUseCase,

    @Inject(IUserFindAllUseCaseToken) findAllUseCase: IUserFindAllUseCase,
    @Inject(IUserRegisterUseCaseToken)
    registerUseCase: IUserRegisterUseCase,
    @Inject(IUserDeleteUseCaseToken) deleteUseCase: IUserDeleteUseCase,
    @Inject(IUserUpdateUseCaseToken) updateUseCase: IUserUpdateUseCase,
  ) {
    this.getUseCase = getUseCase;

    this.findAllUseCase = findAllUseCase;
    this.registerUseCase = registerUseCase;
    this.deleteUseCase = deleteUseCase;
    this.updateUseCase = updateUseCase;
  }

  private readonly getUseCase: IUserGetUseCase;

  private readonly findAllUseCase: IUserFindAllUseCase;

  private readonly registerUseCase: IUserRegisterUseCase;

  private readonly deleteUseCase: IUserDeleteUseCase;

  private readonly updateUseCase: IUserUpdateUseCase;
}
