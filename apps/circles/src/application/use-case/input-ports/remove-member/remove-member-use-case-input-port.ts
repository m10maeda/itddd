import { type RemoveMemberUseCaseInputData } from './remove-member-use-case-input-data';
import { type RemoveMemberUseCaseOutputData } from './remove-member-use-case-output-data';
import { IUseCaseInputPort } from '../use-case-input-port';

export interface IRemoveMemberUseCaseInputPort
  extends IUseCaseInputPort<
    RemoveMemberUseCaseInputData,
    RemoveMemberUseCaseOutputData
  > {}
