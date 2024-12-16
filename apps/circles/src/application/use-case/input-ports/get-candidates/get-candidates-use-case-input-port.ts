import { type GetCandidatesUseCaseInputData } from './get-candidates-use-case-input-data';
import { type GetCandidatesUseCaseOutputData } from './get-candidates-use-case-output-data';
import { IUseCaseInputPort } from '../use-case-input-port';

export interface IGetCandidatesUseCaseInputPort
  extends IUseCaseInputPort<
    GetCandidatesUseCaseInputData,
    GetCandidatesUseCaseOutputData
  > {}
