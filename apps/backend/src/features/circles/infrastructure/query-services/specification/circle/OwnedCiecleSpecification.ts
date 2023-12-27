import {
  CircleSpecification,
  type Circle,
  type CircleMemberId,
} from '../../../../domain';

export class OwnedCiecleSpecification extends CircleSpecification {
  public isSatisfiedBy(target: Circle): boolean {
    return target.owner.equals(this.owner);
  }

  public constructor(owner: CircleMemberId) {
    super();

    this.owner = owner;
  }

  private readonly owner: CircleMemberId;
}
