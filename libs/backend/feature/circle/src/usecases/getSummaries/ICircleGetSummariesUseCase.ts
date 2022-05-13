import { IUseCase } from '@itddd/backend-feature-shared';

import { CircleGetSummariesRequest } from './CircleGetSummariesRequest';
import { CircleGetSummariesResponse } from './CircleGetSummariesResponse';

export interface ICircleGetSummariesUseCase
  extends IUseCase<CircleGetSummariesRequest, CircleGetSummariesResponse> {}
