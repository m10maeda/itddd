import { IUseCase } from '@itddd/backend-feature-shared';

import { CircleDeleteRequest } from './CircleDeleteRequest';
import { CircleDeleteResponse } from './CircleDeleteResponse';

export interface ICircleDeleteUseCase
  extends IUseCase<CircleDeleteRequest, CircleDeleteResponse> {}
