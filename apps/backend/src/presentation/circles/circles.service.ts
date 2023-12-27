import { Inject, Injectable } from '@nestjs/common';

import {
  CIRCLE_ACCEPT_MEMBER_USE_CASE_TOKEN,
  CIRCLE_EXCEPT_MEMBER_USE_CASE_TOKEN,
  CIRCLE_FIND_ALL_USE_CASE_TOKEN,
  CIRCLE_GET_CANDIDATES_USE_CASE_TOKEN,
  CIRCLE_GET_USE_CASE_TOKEN,
  CIRCLE_REGISTER_USE_CASE_TOKEN,
  CIRCLE_UPDATE_USE_CASE_TOKEN,
} from '../../features/circles';
import {
  CircleAcceptMemberRequest,
  CircleAcceptMemberResponse,
  CircleDeleteRequest,
  CircleDeleteResponse,
  CircleFindAllRequest,
  CircleFindAllResponse,
  CircleFindCriteria,
  CircleGetRequest,
  CircleGetResponse,
  CircleRegisterRequest,
  CircleRegisterResponse,
  CircleUpdateRequest,
  CircleUpdateResponse,
  ICircleAcceptMemberUseCase,
  ICircleDeleteUseCase,
  ICircleExceptMemberUseCase,
  ICircleFindAllUseCase,
  ICircleGetCandidatesUseCase,
  ICircleGetUseCase,
  ICircleRegisterUseCase,
  ICircleUpdateUseCase,
} from '../../features/circles/application/usecases';
import { PageInfo } from '../../features/shared/application/usecase';

@Injectable()
export class CirclesService {
  public async getBy(id: string): Promise<CircleGetResponse> {
    const request = new CircleGetRequest(id);

    return this.getUseCase.handle(request);
  }

  public async findAllBy(
    criteria?: {
      query?: string;
      owners?: string[];
      members?: string[];
      excludeOwners?: string[];
      excludeMembers?: string[];
    },
    pageInfo?: { page: number; size: number },
  ): Promise<CircleFindAllResponse> {
    const request = new CircleFindAllRequest(
      new CircleFindCriteria(criteria),
      pageInfo ? new PageInfo(pageInfo.page, pageInfo.size) : undefined,
    );

    return this.findAllUseCase.handle(request);
  }

  public async register(
    name: string,
    owner: string,
  ): Promise<CircleRegisterResponse> {
    const requset = new CircleRegisterRequest(name, owner);

    return this.registerUseCase.handle(requset);
  }

  public async delete(id: string): Promise<CircleDeleteResponse> {
    const requset = new CircleDeleteRequest(id);

    return this.deleteUseCase.handle(requset);
  }

  public async update(id: string, name: string): Promise<CircleUpdateResponse> {
    const requset = new CircleUpdateRequest(id, name);

    return this.updateUseCase.handle(requset);
  }

  public async accept(
    id: string,
    memberId: string,
  ): Promise<CircleAcceptMemberResponse> {
    const request = new CircleAcceptMemberRequest(id, memberId);

    return this.acceptMemberUseCase.handle(request);
  }

  public async except(
    id: string,
    memberId: string,
  ): Promise<CircleAcceptMemberResponse> {
    const request = new CircleAcceptMemberRequest(id, memberId);

    return this.exceptMemberUseCase.handle(request);
  }

  public constructor(
    @Inject(CIRCLE_GET_USE_CASE_TOKEN) getUseCase: ICircleGetUseCase,
    @Inject(CIRCLE_FIND_ALL_USE_CASE_TOKEN)
    findAllUseCase: ICircleFindAllUseCase,
    @Inject(CIRCLE_REGISTER_USE_CASE_TOKEN)
    registerUseCase: ICircleRegisterUseCase,
    @Inject(CIRCLE_FIND_ALL_USE_CASE_TOKEN) deleteUseCase: ICircleDeleteUseCase,
    @Inject(CIRCLE_UPDATE_USE_CASE_TOKEN) updateUseCase: ICircleUpdateUseCase,
    @Inject(CIRCLE_GET_CANDIDATES_USE_CASE_TOKEN)
    getCandidates: ICircleGetCandidatesUseCase,
    @Inject(CIRCLE_ACCEPT_MEMBER_USE_CASE_TOKEN)
    acceptMemberUseCase: ICircleAcceptMemberUseCase,
    @Inject(CIRCLE_EXCEPT_MEMBER_USE_CASE_TOKEN)
    exceptMemberUseCase: ICircleExceptMemberUseCase,
  ) {
    this.getUseCase = getUseCase;
    this.findAllUseCase = findAllUseCase;
    this.registerUseCase = registerUseCase;
    this.deleteUseCase = deleteUseCase;
    this.updateUseCase = updateUseCase;
    this.getCandidates = getCandidates;
    this.acceptMemberUseCase = acceptMemberUseCase;
    this.exceptMemberUseCase = exceptMemberUseCase;
  }

  private readonly getUseCase: ICircleGetUseCase;

  private readonly findAllUseCase: ICircleFindAllUseCase;

  private readonly registerUseCase: ICircleRegisterUseCase;

  private readonly deleteUseCase: ICircleDeleteUseCase;

  private readonly updateUseCase: ICircleUpdateUseCase;

  private readonly getCandidates: ICircleGetCandidatesUseCase;

  private readonly acceptMemberUseCase: ICircleAcceptMemberUseCase;

  private readonly exceptMemberUseCase: ICircleExceptMemberUseCase;
}
