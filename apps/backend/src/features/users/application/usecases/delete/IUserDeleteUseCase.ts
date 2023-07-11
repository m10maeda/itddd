import { UserDeleteRequest } from './UserDeleteRequest';
import { UserDeleteResponse } from './UserDeleteResponse';
import { IUseCase } from '../../../../shared/application/usecase';

export interface IUserDeleteUseCase
  extends IUseCase<UserDeleteRequest, UserDeleteResponse> {}
