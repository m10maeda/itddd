import { UserGetAllRequest } from './UserGetAllRequest';
import { UserGetAllResponse } from './UserGetAllResponse';
import { IUseCase } from '../../../../shared/application/usecase';

export interface IUserGetAllUseCase
  extends IUseCase<UserGetAllRequest, UserGetAllResponse> {}
