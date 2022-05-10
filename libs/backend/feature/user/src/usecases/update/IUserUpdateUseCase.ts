import { IUseCase } from '@itddd/backend-feature-shared';

import { UserUpdateRequest } from './UserUpdateRequest';
import { UserUpdateResponse } from './UserUpdateResponse';

export interface IUserUpdateUseCase
  extends IUseCase<UserUpdateRequest, UserUpdateResponse> {}
