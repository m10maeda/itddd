import { CircleAcceptMemberRequest } from './CircleAcceptMemberRequest';
import { CircleAcceptMemberResponse } from './CircleAcceptMemberResponse';
import { IUseCase } from '../../../../shared/application/usecase';

export interface ICircleAcceptMemberUseCase
  extends IUseCase<CircleAcceptMemberRequest, CircleAcceptMemberResponse> {}
