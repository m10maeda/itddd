import {
  Circle,
  CircleMember,
  CircleMemberSpecification,
} from '../../../../domain';

export class JoinedCircleMemberSpecification extends CircleMemberSpecification {
  public isSatisfiedBy(target: CircleMember): boolean {
    return Array.from(this.circle.members).some((member) =>
      member.equals(target.id),
    );
  }

  public constructor(circle: Circle) {
    super();

    this.circle = circle;
  }

  private readonly circle: Circle;
}
