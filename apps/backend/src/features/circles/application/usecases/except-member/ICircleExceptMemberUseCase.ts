import { CircleExceptMemberRequest } from './CircleExceptMemberRequest';
import { CircleExceptMemberResponse } from './CircleExceptMemberResponse';
import { IUseCase } from '../../../../shared/application/usecase';

export interface ICircleExceptMemberUseCase
  extends IUseCase<CircleExceptMemberRequest, CircleExceptMemberResponse> {}
