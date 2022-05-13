import { IUseCase } from '@itddd/backend-feature-shared';

import { CircleLeaveRequest } from './CircleLeaveRequest';
import { CircleLeaveResponse } from './CircleLeaveResponse';

export interface ICircleLeaveUseCase
  extends IUseCase<CircleLeaveRequest, CircleLeaveResponse> {}
