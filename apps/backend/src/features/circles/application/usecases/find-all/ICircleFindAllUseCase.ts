import { CircleFindAllRequest } from './CircleFindAllRequest';
import { CircleFindAllResponse } from './CircleFindAllResponse';
import { IUseCase } from '../../../../shared/application/usecase';

export interface ICircleFindAllUseCase
  extends IUseCase<CircleFindAllRequest, CircleFindAllResponse> {}
