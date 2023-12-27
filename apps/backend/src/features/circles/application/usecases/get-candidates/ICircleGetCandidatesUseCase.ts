import { CircleGetCandidatesRequest } from './CircleGetCandidatesRequest';
import { CircleGetCandidatesResponse } from './CircleGetCandidatesResponse';
import { IUseCase } from '../../../../shared/application/usecase';

export interface ICircleGetCandidatesUseCase
  extends IUseCase<CircleGetCandidatesRequest, CircleGetCandidatesResponse> {}
