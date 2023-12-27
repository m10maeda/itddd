import { CircleGetRequest } from './CircleGetRequest';
import { CircleGetResponse } from './CircleGetResponse';
import { IUseCase } from '../../../../shared/application/usecase';

export interface ICircleGetUseCase
  extends IUseCase<CircleGetRequest, CircleGetResponse> {}
