import { UserRegisterRequest } from './UserRegisterRequest';
import { UserRegisterResponse } from './UserRegisterResponse';
import { IUseCase } from '../../../../shared/application/usecase';

export interface IUserRegisterUseCase
  extends IUseCase<UserRegisterRequest, UserRegisterResponse> {}
