import {
  Circle,
  CircleMember,
  CircleMemberSpecification,
} from '../../../../domain';

export class OwnedCircleMemberSpecification extends CircleMemberSpecification {
  public isSatisfiedBy(target: CircleMember): boolean {
    return this.circle.owner.equals(target.id);
  }

  public constructor(circle: Circle) {
    super();

    this.circle = circle;
  }

  private readonly circle: Circle;
}
