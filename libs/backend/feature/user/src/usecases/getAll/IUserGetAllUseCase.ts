import { IUseCase } from '@itddd/backend-feature-shared';

import { UserGetAllRequest } from './UserGetAllRequest';
import { UserGetAllResponse } from './UserGetAllResponse';

export interface IUserGetAllUseCase
  extends IUseCase<UserGetAllRequest, UserGetAllResponse> {}
