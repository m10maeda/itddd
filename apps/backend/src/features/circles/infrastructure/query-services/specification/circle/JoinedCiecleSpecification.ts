import {
  CircleSpecification,
  type Circle,
  type CircleMemberId,
} from '../../../../domain';

export class JoinedCiecleSpecification extends CircleSpecification {
  public isSatisfiedBy(target: Circle): boolean {
    return Array.from(target.members).some((member) =>
      member.equals(this.member),
    );
  }

  public constructor(member: CircleMemberId) {
    super();

    this.member = member;
  }

  private readonly member: CircleMemberId;
}
