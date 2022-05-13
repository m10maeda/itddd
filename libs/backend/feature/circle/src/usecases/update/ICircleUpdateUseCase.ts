import { IUseCase } from '@itddd/backend-feature-shared';

import { CircleUpdateRequest } from './CircleUpdateRequest';
import { CircleUpdateResponse } from './CircleUpdateResponse';

export interface ICircleUpdateUseCase
  extends IUseCase<CircleUpdateRequest, CircleUpdateResponse> {}
