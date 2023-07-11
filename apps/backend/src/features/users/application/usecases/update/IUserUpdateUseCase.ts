import { UserUpdateRequest } from './UserUpdateRequest';
import { UserUpdateResponse } from './UserUpdateResponse';
import { IUseCase } from '../../../../shared/application/usecase';

export interface IUserUpdateUseCase
  extends IUseCase<UserUpdateRequest, UserUpdateResponse> {}
