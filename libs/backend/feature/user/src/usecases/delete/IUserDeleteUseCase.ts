import { IUseCase } from '@itddd/backend-feature-shared';

import { UserDeleteRequest } from './UserDeleteRequest';
import { UserDeleteResponse } from './UserDeleteResponse';

export interface IUserDeleteUseCase
  extends IUseCase<UserDeleteRequest, UserDeleteResponse> {}
