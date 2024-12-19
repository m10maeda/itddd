import { type DeleteCircleUseCaseInputData } from './delete-circle-use-case-input-data';
import { type DeleteCircleUseCaseOutputData } from './delete-circle-use-case-output-data';
import { IUseCaseInputPort } from '../use-case-input-port';

export interface IDeleteCircleUseCaseInputPort
  extends IUseCaseInputPort<
    DeleteCircleUseCaseInputData,
    DeleteCircleUseCaseOutputData
  > {}
