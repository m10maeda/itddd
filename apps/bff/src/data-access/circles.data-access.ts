import { Inject, Injectable } from '@nestjs/common';

import { UsersDataAccess } from './users.data-access';
import {
  CirclesApiInterface,
  ResponseError,
  Circle as CircleSchema,
} from '../../lib/backend-adapter/v1.0';
import {
  CanNotRegisterCircleError,
  Circle,
  CircleList,
  CircleNotFoundError,
} from '../circles';
import {
  Criteria,
  ICirclesDataAccess,
  PageInfo,
} from '../circles/circles.data-access';
import { UserList } from '../users';

@Injectable()
export class CirclesDataAccess implements ICirclesDataAccess {
  public async getBy(id: string): Promise<Circle> {
    try {
      const circle = await this.apiClient.circlesControllerGetBy({ id });

      return await this.convertToCircleModel(circle);
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.response.status === 404) throw new CircleNotFoundError(id);
      }

      throw error;
    }
  }

  public async findAllBy(
    criteria?: Criteria | undefined,
    pageInfo?: PageInfo | undefined,
  ): Promise<CircleList> {
    const data = await this.apiClient.circlesControllerFindAllBy({
      ...criteria,
      ...pageInfo,
    });

    const circles = await Promise.all(
      Array.from(data.circles).map(async (circle) =>
        this.convertToCircleModel(circle),
      ),
    );

    return new CircleList(circles, data.total);
  }

  public async create(name: string, ownerId: string): Promise<Circle> {
    try {
      const data = await this.apiClient.circlesControllerRegister({
        registerCircleInput: { name, owner: ownerId },
      });

      return await this.convertToCircleModel(data);
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.response.status === 400)
          throw new CanNotRegisterCircleError(name, `"${name}" is invalid.`);

        if (error.response.status === 409)
          throw new CanNotRegisterCircleError(
            name,
            `"${name}" is already registered.`,
          );
      }

      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.apiClient.circlesControllerDelete({ id });
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.response.status === 404) throw new CircleNotFoundError(id);
      }

      throw error;
    }
  }

  public async update(id: string, name: string): Promise<Circle> {
    try {
      const user = await this.apiClient.circlesControllerUpdate({
        id,
        updateCircleInput: { name },
      });

      return await this.convertToCircleModel(user);
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.response.status === 400)
          throw new CanNotRegisterCircleError(name, `"${name}" is invalid.`);

        if (error.response.status === 404) throw new CircleNotFoundError(id);

        if (error.response.status === 409)
          throw new CanNotRegisterCircleError(
            name,
            `"${name}" is already registerd.`,
          );
      }

      throw error;
    }
  }

  public async accept(id: string, memberId: string): Promise<Circle> {
    try {
      const circle = await this.apiClient.circlesControllerAcceptMember({
        id,
        acceptMemberInput: { memberId },
      });

      return await this.convertToCircleModel(circle);
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.response.status === 404) throw new CircleNotFoundError(id);
      }

      throw error;
    }
  }

  public async except(id: string, memberId: string): Promise<Circle> {
    try {
      const circle = await this.apiClient.circlesControllerExceptMember({
        id,
        memberId,
      });

      return await this.convertToCircleModel(circle);
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.response.status === 404) throw new CircleNotFoundError(id);
      }

      throw error;
    }
  }

  public async getCandidates(id: string): Promise<UserList> {
    try {
      const { users } = await this.apiClient.circlesControllerGetCandidates({
        id,
      });
      const userIds = users.map((user) => user.id);

      return await this.usersDataAccess.findAllBy({
        includes: userIds,
      });
    } catch (error) {
      if (error instanceof ResponseError) {
        if (error.response.status === 404) throw new CircleNotFoundError(id);
      }

      throw error;
    }
  }

  public constructor(
    @Inject('CIRCLES_API_CLIENT') apiClient: CirclesApiInterface,
    @Inject(UsersDataAccess) usersDataAccess: UsersDataAccess,
  ) {
    this.apiClient = apiClient;
    this.usersDataAccess = usersDataAccess;
  }

  private readonly apiClient: CirclesApiInterface;

  private readonly usersDataAccess: UsersDataAccess;

  // eslint-disable-next-line class-methods-use-this
  private async convertToCircleModel(circle: CircleSchema): Promise<Circle> {
    const owner = await this.usersDataAccess.getBy(circle.owner);

    const { users } = await this.apiClient.circlesControllerGetMembers({
      id: circle.id,
    });
    const memberIds = users.map((user) => user.id);
    const { results: members } = await this.usersDataAccess.findAllBy({
      includes: memberIds,
    });

    return new Circle(circle.id, circle.name, owner, members);
  }
}
