import { ICircleSpecificationBuilder } from './ICircleSpecificationBuilder';
import {
  CircleData,
  CircleFindAllRequest,
  CircleFindAllResponse,
  CircleFindCriteria,
  ICircleFindAllUseCase,
} from '../../application/usecases';
import {
  CircleMemberId,
  ICircleRepository,
  ICircleSpecification,
} from '../../domain';

export class CircleFindAllQueryService implements ICircleFindAllUseCase {
  public async handle(
    request: CircleFindAllRequest,
  ): Promise<CircleFindAllResponse> {
    const criteria = this.buildSpec(request.criteria);

    const circles = await this.circleRepository.findAllBy(criteria);

    const { pageInfo } = request;
    const chunk = pageInfo ? pageInfo.chunk(circles) : circles;

    const total = Array.from(circles).length;

    return new CircleFindAllResponse(
      Array.from(chunk).map(
        (circle) =>
          new CircleData(
            circle.id.toString(),
            circle.name.toString(),
            circle.owner.toString(),
            Array.from(circle.members).map((member) => member.toString()),
          ),
      ),
      total,
    );
  }

  public constructor(
    circleRepository: ICircleRepository,
    circleSpecBuilder: ICircleSpecificationBuilder,
  ) {
    this.circleRepository = circleRepository;
    this.circleSpecBuilder = circleSpecBuilder;
  }

  private readonly circleRepository: ICircleRepository;

  private readonly circleSpecBuilder: ICircleSpecificationBuilder;

  private buildSpec(criteria: CircleFindCriteria): ICircleSpecification {
    if (criteria.query) {
      this.circleSpecBuilder.query(criteria.query);
    }

    if (criteria.owners) {
      const owners = criteria.owners.map((owner) => new CircleMemberId(owner));
      this.circleSpecBuilder.includeOwners(owners);
    }

    if (criteria.members) {
      const members = criteria.members.map(
        (member) => new CircleMemberId(member),
      );
      this.circleSpecBuilder.includeOwners(members);
    }

    if (criteria.excludeOwners) {
      const excludeOwners = criteria.excludeOwners.map(
        (excludeOwner) => new CircleMemberId(excludeOwner),
      );
      this.circleSpecBuilder.excludeOwners(excludeOwners);
    }

    if (criteria.excludeMembers) {
      const excludeMembers = criteria.excludeMembers.map(
        (excludeMember) => new CircleMemberId(excludeMember),
      );
      this.circleSpecBuilder.excludeMembers(excludeMembers);
    }

    return this.circleSpecBuilder.build();
  }
}
