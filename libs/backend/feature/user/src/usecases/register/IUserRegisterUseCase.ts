import { IUseCase } from '@itddd/backend-feature-shared';

import { UserRegisterRequest } from './UserRegisterRequest';
import { UserRegisterResponse } from './UserRegisterResponse';

export interface IUserRegisterUseCase
  extends IUseCase<UserRegisterRequest, UserRegisterResponse> {}
