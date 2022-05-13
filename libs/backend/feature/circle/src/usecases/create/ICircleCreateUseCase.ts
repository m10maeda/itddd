import { IUseCase } from '@itddd/backend-feature-shared';

import { CircleCreateRequest } from './CircleCreateRequest';
import { CircleCreateResponse } from './CircleCreateResponse';

export interface ICircleCreateUseCase
  extends IUseCase<CircleCreateRequest, CircleCreateResponse> {}
