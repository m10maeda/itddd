import { IUseCaseInputPort } from '../use-case-input-port';
import { type DeleteRelationsUseCaseInputData } from './delete-relations-use-case-input-data';
import { type DeleteRelationsUseCaseOutputData } from './delete-relations-use-case-output-data';

export interface IDeleteRelationsUseCaseInputPort
  extends IUseCaseInputPort<
    DeleteRelationsUseCaseInputData,
    DeleteRelationsUseCaseOutputData
  > {}
