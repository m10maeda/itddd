import { type ChangeOwnerUseCaseInputData } from './change-owner-use-case-input-data';
import { type ChangeOwnerUseCaseOutputData } from './change-owner-use-case-output-data';
import { IUseCaseInputPort } from '../use-case-input-port';

export interface IChangeOwnerUseCaseInputPort
  extends IUseCaseInputPort<
    ChangeOwnerUseCaseInputData,
    ChangeOwnerUseCaseOutputData
  > {}
