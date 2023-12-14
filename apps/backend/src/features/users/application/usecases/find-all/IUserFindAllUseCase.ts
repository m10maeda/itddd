import { UserFindAllRequest } from './UserFindAllRequest';
import { UserFindAllResponse } from './UserFindAllResponse';
import { IUseCase } from '../../../../shared/application/usecase';

export interface IUserFindAllUseCase
  extends IUseCase<UserFindAllRequest, UserFindAllResponse> {}
