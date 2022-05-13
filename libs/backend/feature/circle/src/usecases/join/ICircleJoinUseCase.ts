import { IUseCase } from '@itddd/backend-feature-shared';

import { CircleJoinRequest } from './CircleJoinRequest';
import { CircleJoinResponse } from './CircleJoinResponse';

export interface ICircleJoinUseCase
  extends IUseCase<CircleJoinRequest, CircleJoinResponse> {}
