import { type FindAllCirclesUseCaseInputData } from './find-all-circles-use-case-input-data';
import { type FindAllCirclesUseCaseOutputData } from './find-all-circles-use-case-output-data';
import { IUseCaseInputPort } from '../use-case-input-port';

export interface IFindAllCirclesUseCaseInputPort
  extends IUseCaseInputPort<
    FindAllCirclesUseCaseInputData,
    FindAllCirclesUseCaseOutputData
  > {}
