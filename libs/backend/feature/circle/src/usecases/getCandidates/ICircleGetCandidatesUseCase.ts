import { IUseCase } from '@itddd/backend-feature-shared';

import { CircleGetCandidatesRequest } from './CircleGetCandidatesRequest';
import { CircleGetCandidatesResponse } from './CircleGetCandidatesResponse';

export interface ICircleGetCandidatesUseCase
  extends IUseCase<CircleGetCandidatesRequest, CircleGetCandidatesResponse> {}
