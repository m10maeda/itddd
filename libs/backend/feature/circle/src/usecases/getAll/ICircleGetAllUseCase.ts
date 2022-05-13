import { IUseCase } from '@itddd/backend-feature-shared';

import { CircleGetAllRequest } from './CircleGetAllRequest';
import { CircleGetAllResponse } from './CircleGetAllResponse';

export interface ICircleGetAllUseCase
  extends IUseCase<CircleGetAllRequest, CircleGetAllResponse> {}
