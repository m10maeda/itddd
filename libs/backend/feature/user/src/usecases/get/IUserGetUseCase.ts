import { IUseCase } from '@itddd/backend-feature-shared';

import { UserGetRequest } from './UserGetRequest';
import { UserGetResponse } from './UserGetResponse';

export interface IUserGetUseCase
  extends IUseCase<UserGetRequest, UserGetResponse> {}
