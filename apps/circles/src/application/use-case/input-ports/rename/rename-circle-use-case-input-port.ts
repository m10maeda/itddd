import { type RenameCircleUseCaseInputData } from './rename-circle-use-case-input-data';
import { type RenameCircleUseCaseOutputData } from './rename-circle-use-case-output-data';
import { IUseCaseInputPort } from '../use-case-input-port';

export interface IRenameCircleUseCaseInputPort
  extends IUseCaseInputPort<
    RenameCircleUseCaseInputData,
    RenameCircleUseCaseOutputData
  > {}
