import { CircleUpdateRequest } from './CircleUpdateRequest';
import { CircleUpdateResponse } from './CircleUpdateResponse';
import { IUseCase } from '../../../../shared/application/usecase';

export interface ICircleUpdateUseCase
  extends IUseCase<CircleUpdateRequest, CircleUpdateResponse> {}
