import { type GetCircleUseCaseInputData } from './get-circle-use-case-input-data';
import { type GetCircleUseCaseOutputData } from './get-circle-use-case-output-data';
import { IUseCaseInputPort } from '../use-case-input-port';

export interface IGetCircleUseCaseInputPort
  extends IUseCaseInputPort<
    GetCircleUseCaseInputData,
    GetCircleUseCaseOutputData
  > {}
