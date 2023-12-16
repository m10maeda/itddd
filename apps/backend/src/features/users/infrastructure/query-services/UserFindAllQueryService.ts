import { IUserSpecificationBuilder } from './IUserSpecificationBuilder';
import {
  IUserFindAllUseCase,
  UserFindAllRequest,
  UserFindAllResponse,
  UserFindCriteria,
  UserData,
  UserType,
} from '../../application/usecases';
import { IUserRepository, IUserSpecification, UserId } from '../../domain';

export class UserFindAllQueryService implements IUserFindAllUseCase {
  public async handle(
    request: UserFindAllRequest,
  ): Promise<UserFindAllResponse> {
    const criteria = this.buildSpec(request.criteria);

    const users = await this.userRepository.findAllBy(criteria);

    const { pageInfo } = request;
    const chunk = pageInfo ? pageInfo.chunk(users) : users;

    const total = Array.from(users).length;

    return new UserFindAllResponse(
      Array.from(chunk).map(
        (user) =>
          new UserData(
            user.id.toString(),
            user.name.toString(),
            user.isPremium() ? UserType.Premium : UserType.Normal,
          ),
      ),
      total,
    );
  }

  public constructor(
    userRepository: IUserRepository,
    userSpecBuilder: IUserSpecificationBuilder,
  ) {
    this.userRepository = userRepository;
    this.userSpecBuilder = userSpecBuilder;
  }

  private readonly userRepository: IUserRepository;

  private readonly userSpecBuilder: IUserSpecificationBuilder;

  private buildSpec(criteria: UserFindCriteria): IUserSpecification {
    const { query, includeIds, excludeIds } = criteria;
    if (query) {
      this.userSpecBuilder.query(query);
    }

    if (includeIds) {
      const userIds = includeIds.map((id) => new UserId(id));
      this.userSpecBuilder.include(userIds);
    }

    if (excludeIds) {
      const userIds = excludeIds.map((id) => new UserId(id));
      this.userSpecBuilder.exclude(userIds);
    }

    return this.userSpecBuilder.build();
  }
}
