import { type AddMemberUseCaseInputData } from './add-member-use-case-input-data';
import { type AddMemberUseCaseOutputData } from './add-member-use-case-output-data';
import { IUseCaseInputPort } from '../use-case-input-port';

export interface IAddMemberUseCaseInputPort
  extends IUseCaseInputPort<
    AddMemberUseCaseInputData,
    AddMemberUseCaseOutputData
  > {}
