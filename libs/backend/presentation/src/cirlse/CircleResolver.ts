import {
  CircleCreateRequest,
  CircleData,
  CircleDeleteRequest,
  CircleGetAllRequest,
  CircleGetCandidatesRequest,
  CircleGetRequest,
  CircleJoinRequest,
  CircleLeaveRequest,
  CircleNotFoundException,
  CircleUpdateRequest,
  ICircleCreateUseCase,
  ICircleDeleteUseCase,
  ICircleGetAllUseCase,
  ICircleGetCandidatesUseCase,
  ICircleGetUseCase,
  ICircleJoinUseCase,
  ICircleLeaveUseCase,
  ICircleUpdateUseCase,
  CanNotRegisterCircleException,
} from '@itddd/backend-feature-circle';
import { UserNotFoundException } from '@itddd/backend-feature-user';
import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { User, UserNotFoundError } from '../user/models';
import {
  Circle,
  CircleResult,
  CircleNotFoundError,
  CanNotRegisterCircleError,
  CircleRegistrationResult,
} from './models';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of) => Circle)
export class CircleResolver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => CircleResult, { name: 'circle' })
  public async getBy(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<typeof CircleResult> {
    try {
      const request = new CircleGetRequest(id);

      const { circle } = await this.getUseCase.handle(request);

      return await this.convert(circle);
    } catch (error) {
      if (error instanceof CircleNotFoundException) {
        return new CircleNotFoundError(
          error.id,
          `Circle "${error.id}" not found`,
        );
      }

      if (error instanceof UserNotFoundException) {
        return new UserNotFoundError(error.id, `Owner "${error.id}" not found`);
      }

      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Circle], { name: 'circles' })
  public async findAll(): Promise<Circle[]> {
    const request = new CircleGetAllRequest();
    const { circles } = await this.getAllUseCase.handle(request);

    return Promise.all(
      Array.from(circles).map(async (circle) => this.convert(circle)),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [User], { name: 'candidates' })
  public async getCandidatesBy(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<User[]> {
    const request = new CircleGetCandidatesRequest(id);
    const { candidates } = await this.getCandidatesUseCase.handle(request);

    return Promise.all(
      Array.from(candidates).map(
        (candidate) => new User(candidate.id, candidate.name),
      ),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => CircleRegistrationResult, { name: 'createCircle' })
  public async create(
    @Args('name') name: string,
    @Args('ownerId', { type: () => ID }) ownerId: string,
  ): Promise<typeof CircleRegistrationResult> {
    try {
      const request = new CircleCreateRequest(name, ownerId);
      const { createdCiecleId } = await this.createUseCase.handle(request);

      return await this.getBy(createdCiecleId);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return new UserNotFoundError(error.id, `Owner "${error.id}" not found`);
      }

      if (error instanceof CanNotRegisterCircleException) {
        return new CanNotRegisterCircleError(
          error.name,
          `Can not register circle "${error.name}"`,
        );
      }

      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => Boolean, { name: 'deleteCircle' })
  public async delete(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    try {
      const request = new CircleDeleteRequest(id);
      await this.deleteUseCase.handle(request);

      return true;
    } catch (error) {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => CircleRegistrationResult, { name: 'updateCircle' })
  public async update(
    @Args('id', { type: () => ID }) id: string,
    @Args('name') name: string,
  ): Promise<typeof CircleRegistrationResult> {
    try {
      const request = new CircleUpdateRequest(id, name);
      await this.updateUseCase.handle(request);

      return await this.getBy(id);
    } catch (error) {
      if (error instanceof CanNotRegisterCircleException) {
        return new CanNotRegisterCircleError(
          error.name,
          `Can not register circle "${error.name}"`,
        );
      }

      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => CircleResult, { name: 'joinCircle' })
  public async join(
    @Args('id', { type: () => ID }) id: string,
    @Args('userId', { type: () => ID }) userId: string,
  ): Promise<typeof CircleResult> {
    try {
      const request = new CircleJoinRequest(id, userId);
      await this.joinUseCase.handle(request);

      return await this.getBy(id);
    } catch (error) {
      if (error instanceof CircleNotFoundException) {
        return new CircleNotFoundError(
          error.id,
          `Circle "${error.id}" not found`,
        );
      }

      if (error instanceof UserNotFoundException) {
        return new UserNotFoundError(error.id, `User "${error.id}" not found`);
      }

      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => CircleResult, { name: 'leaveCircle' })
  public async leave(
    @Args('id', { type: () => ID }) id: string,
    @Args('memberId', { type: () => ID }) memberId: string,
  ): Promise<typeof CircleResult> {
    try {
      const request = new CircleLeaveRequest(id, memberId);
      await this.leaveUseCase.handle(request);

      return await this.getBy(id);
    } catch (error) {
      if (error instanceof CircleNotFoundException) {
        return new CircleNotFoundError(
          error.id,
          `Circle "${error.id}" not found`,
        );
      }

      if (error instanceof UserNotFoundException) {
        return new UserNotFoundError(
          error.id,
          `Member "${error.id}" not found`,
        );
      }

      throw error;
    }
  }

  public constructor(
    @Inject('ICircleGetUseCase') getUseCase: ICircleGetUseCase,
    @Inject('ICircleGetAllUseCase') getAllUseCase: ICircleGetAllUseCase,
    @Inject('ICircleCreateUseCase') createUseCase: ICircleCreateUseCase,
    @Inject('ICircleDeleteUseCase') deleteUseCase: ICircleDeleteUseCase,
    @Inject('ICircleUpdateUseCase') updateUseCase: ICircleUpdateUseCase,
    @Inject('ICircleJoinUseCase') joinUseCase: ICircleJoinUseCase,
    @Inject('ICircleLeaveUseCase') leaveUseCase: ICircleLeaveUseCase,
    @Inject('ICircleGetCandidatesUseCase')
    getCandidatesUseCase: ICircleGetCandidatesUseCase,
  ) {
    this.getUseCase = getUseCase;
    this.getAllUseCase = getAllUseCase;
    this.createUseCase = createUseCase;
    this.deleteUseCase = deleteUseCase;
    this.updateUseCase = updateUseCase;
    this.joinUseCase = joinUseCase;
    this.leaveUseCase = leaveUseCase;
    this.getCandidatesUseCase = getCandidatesUseCase;
  }

  private readonly getUseCase: ICircleGetUseCase;

  private readonly getAllUseCase: ICircleGetAllUseCase;

  private readonly createUseCase: ICircleCreateUseCase;

  private readonly deleteUseCase: ICircleDeleteUseCase;

  private readonly updateUseCase: ICircleUpdateUseCase;

  private readonly joinUseCase: ICircleJoinUseCase;

  private readonly leaveUseCase: ICircleLeaveUseCase;

  private readonly getCandidatesUseCase: ICircleGetCandidatesUseCase;

  // eslint-disable-next-line class-methods-use-this
  private async convert(circle: CircleData): Promise<Circle> {
    return new Circle(
      circle.id,
      circle.name,
      circle.ownerId,
      Array.from(circle.memberIds),
    );
  }
}
