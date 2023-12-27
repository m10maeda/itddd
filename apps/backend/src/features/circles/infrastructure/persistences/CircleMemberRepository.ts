import {
  IUserFindAllUseCase,
  IUserGetUseCase,
  UserData,
  UserFindAllRequest,
  UserFindCriteria,
  UserGetRequest,
  UserNotFoundException,
} from '../../../users/application/usecases';
import { CircleNotFoundException } from '../../application/usecases';
import {
  CircleId,
  CircleMember,
  CircleMemberId,
  ICircleMemberRepository,
  ICircleMemberSpecification,
  ICircleRepository,
  UserType,
} from '../../domain';

export class CircleMemberRepository implements ICircleMemberRepository {
  public async findBy(id: CircleMemberId): Promise<CircleMember | undefined> {
    try {
      const request = new UserGetRequest(id.toString());
      const { user } = await this.userGetUseCase.handle(request);

      return this.toCircleMemberFrom(user);
    } catch (error) {
      if (error instanceof UserNotFoundException) return undefined;

      throw error;
    }
  }

  public findAllBy(circleId: CircleId): Promise<Iterable<CircleMember>>;
  public findAllBy(
    criteria: ICircleMemberSpecification,
  ): Promise<Iterable<CircleMember>>;
  public async findAllBy(
    criteria: CircleId | ICircleMemberSpecification,
  ): Promise<Iterable<CircleMember>> {
    if (criteria instanceof CircleId) return this.findByCircleId(criteria);

    const { users } = await this.userFindAllUseCase.handle(
      new UserFindAllRequest(new UserFindCriteria()),
    );

    return Array.from(users)
      .map((user) => this.toCircleMemberFrom(user))
      .filter((member) => criteria.isSatisfiedBy(member));
  }

  public constructor(
    userGetUseCase: IUserGetUseCase,
    userFindAllUseCase: IUserFindAllUseCase,
    circleRepository: ICircleRepository,
  ) {
    this.userGetUseCase = userGetUseCase;
    this.userFindAllUseCase = userFindAllUseCase;
    this.circleRepository = circleRepository;
  }

  private readonly userGetUseCase: IUserGetUseCase;

  private readonly userFindAllUseCase: IUserFindAllUseCase;

  private readonly circleRepository: ICircleRepository;

  private async findByCircleId(
    circleId: CircleId,
  ): Promise<Iterable<CircleMember>> {
    const circle = await this.circleRepository.findBy(circleId);

    if (circle === undefined) throw new CircleNotFoundException(circleId);

    const { users } = await this.userFindAllUseCase.handle(
      new UserFindAllRequest(
        new UserFindCriteria({
          includeIds: [circle.owner, ...Array.from(circle.members)].map(
            (memberId) => memberId.toString(),
          ),
        }),
      ),
    );

    return Array.from(users).map((user) => this.toCircleMemberFrom(user));
  }

  // eslint-disable-next-line class-methods-use-this
  private toCircleMemberFrom(user: UserData): CircleMember {
    return new CircleMember(
      new CircleMemberId(user.id),
      user.isPremium() ? UserType.Premium : UserType.Normal,
    );
  }
}
