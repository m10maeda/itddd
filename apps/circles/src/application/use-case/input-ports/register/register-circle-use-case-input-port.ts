import { type RegisterCircleUseCaseInputData } from './register-circle-use-case-input-data';
import { type RegisterCircleUseCaseOutputData } from './register-circle-use-case-output-data';
import { IUseCaseInputPort } from '../use-case-input-port';

export interface IRegisterCircleUseCaseInputPort
  extends IUseCaseInputPort<
    RegisterCircleUseCaseInputData,
    RegisterCircleUseCaseOutputData
  > {}
