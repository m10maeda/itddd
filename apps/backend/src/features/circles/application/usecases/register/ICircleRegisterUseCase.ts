import { CircleRegisterRequest } from './CircleRegisterRequest';
import { CircleRegisterResponse } from './CircleRegisterResponse';
import { IUseCase } from '../../../../shared/application/usecase';

export interface ICircleRegisterUseCase
  extends IUseCase<CircleRegisterRequest, CircleRegisterResponse> {}
