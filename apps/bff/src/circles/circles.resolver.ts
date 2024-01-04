import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { CIRCLES_DATA_ACCESS, ICirclesDataAccess } from './circles.data-access';
import {
  AcceptCircleMemberInput,
  ExceptCircleMemberInput,
  FindCirclesArgs,
  RegisterCircleInput,
  UpdateCircleInput,
} from './dto';
import {
  CanNotAcceptCircleMemberError,
  CanNotRegisterCircleError,
  Circle,
  CircleAcceptMemberResult,
  CircleDelete,
  CircleDeleteResult,
  CircleExceptMemberResult,
  CircleList,
  CircleNotFoundError,
  CircleRegistrationResult,
  CircleResult,
  CircleUpdateResult,
} from './models';
import { PageInfoArgs } from '../shared';
import { UserList, UserNotFoundError } from '../users';

@Resolver(() => Circle)
export class CirclesResolver {
  @Query(() => CircleResult, {
    name: 'circle',
    description: 'Get one circle information by specified id',
  })
  public async getBy(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<typeof CircleResult> {
    try {
      return await this.circlesDataAccess.getBy(id);
    } catch (error) {
      if (error instanceof CircleNotFoundError) return error;

      throw error;
    }
  }

  @Query(() => CircleList, {
    name: 'circles',
    description: 'Find circles information',
  })
  public async findAllBy(
    @Args({ nullable: true }) pageInfoArgs: PageInfoArgs,
    @Args({ nullable: true }) findCirclesArgs: FindCirclesArgs,
  ): Promise<CircleList> {
    return this.circlesDataAccess.findAllBy({
      ...findCirclesArgs,
      ...pageInfoArgs,
    });
  }

  @Mutation(() => CircleRegistrationResult, {
    name: 'registerCircle',
    description: 'Register a new circle with specified input',
  })
  public async register(
    @Args('registerCircleData') registerCircleData: RegisterCircleInput,
  ): Promise<typeof CircleRegistrationResult> {
    const { name, owner: ownerId } = registerCircleData;

    try {
      return await this.circlesDataAccess.create(name, ownerId);
    } catch (error) {
      if (error instanceof CanNotRegisterCircleError) return error;

      throw error;
    }
  }

  @Mutation(() => CircleDeleteResult, {
    name: 'deleteCircle',
    description: 'Delete the circle with specivied id',
  })
  public async delete(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<typeof CircleDeleteResult> {
    try {
      await this.circlesDataAccess.delete(id);

      return new CircleDelete(id, true);
    } catch (error) {
      if (error instanceof CircleNotFoundError) return error;

      return new CircleDelete(id, false);
    }
  }

  @Mutation(() => CircleUpdateResult, {
    name: 'updateCircle',
    description: 'Update circle information with specified id and input',
  })
  public async update(
    @Args('updateCircleData') updateCircleData: UpdateCircleInput,
  ): Promise<typeof CircleUpdateResult> {
    try {
      const { id, name } = updateCircleData;

      return await this.circlesDataAccess.update(id, name);
    } catch (error) {
      if (error instanceof CircleNotFoundError) return error;
      if (error instanceof CanNotRegisterCircleError) return error;

      throw error;
    }
  }

  @Mutation(() => CircleAcceptMemberResult, {
    name: 'addCircleMember',
    description: 'Add specified member to specified circle',
  })
  public async accept(
    @Args('acceptCircleMemberData')
    acceptCircleMemberData: AcceptCircleMemberInput,
  ): Promise<typeof CircleAcceptMemberResult> {
    try {
      const { id, member } = acceptCircleMemberData;

      return await this.circlesDataAccess.accept(id, member);
    } catch (error) {
      if (error instanceof UserNotFoundError) return error;
      if (error instanceof CircleNotFoundError) return error;
      if (error instanceof CanNotAcceptCircleMemberError) return error;

      throw error;
    }
  }

  @Mutation(() => CircleExceptMemberResult, {
    name: 'removeCircleMember',
    description: 'Remove specified member from specified circle',
  })
  public async except(
    @Args('exceptCircleMemberData')
    exceptCircleMemberData: ExceptCircleMemberInput,
  ): Promise<typeof CircleExceptMemberResult> {
    try {
      const { id, member } = exceptCircleMemberData;

      return await this.circlesDataAccess.except(id, member);
    } catch (error) {
      if (error instanceof UserNotFoundError) return error;
      if (error instanceof CircleNotFoundError) return error;

      throw error;
    }
  }

  @Query(() => UserList, {
    name: 'circleMemberCandidates',
    description: 'Get all circle member candidates',
  })
  public async getCandidates(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<UserList> {
    return this.circlesDataAccess.getCandidates(id);
  }

  public constructor(
    @Inject(CIRCLES_DATA_ACCESS) circlesDataAccess: ICirclesDataAccess,
  ) {
    this.circlesDataAccess = circlesDataAccess;
  }

  private readonly circlesDataAccess: ICirclesDataAccess;
}
