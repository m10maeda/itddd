import { IUseCase } from '@itddd/backend-feature-shared';

import { CircleGetRequest } from './CircleGetRequest';
import { CircleGetResponse } from './CircleGetResponse';

export interface ICircleGetUseCase
  extends IUseCase<CircleGetRequest, CircleGetResponse> {}
