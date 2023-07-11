import { UserGetRequest } from './UserGetRequest';
import { UserGetResponse } from './UserGetResponse';
import { IUseCase } from '../../../../shared/application/usecase';

export interface IUserGetUseCase
  extends IUseCase<UserGetRequest, UserGetResponse> {}
