import { CircleDeleteRequest } from './CircleDeleteRequest';
import { CircleDeleteResponse } from './CircleDeleteResponse';
import { IUseCase } from '../../../../shared/application/usecase';

export interface ICircleDeleteUseCase
  extends IUseCase<CircleDeleteRequest, CircleDeleteResponse> {}
