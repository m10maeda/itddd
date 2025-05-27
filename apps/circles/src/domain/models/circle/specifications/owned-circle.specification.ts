import { CircleSpecification } from '../circle.specification';

import type { Member } from '../../member';
import type { Circle } from '../circle';

export class OwnedCircleSpecification extends CircleSpecification {
  private readonly member: Member;

  public isSatisfiedBy(circle: Circle): boolean {
    return circle.owns(this.member);
  }

  public constructor(member: Member) {
    super();

    this.member = member;
  }
}
