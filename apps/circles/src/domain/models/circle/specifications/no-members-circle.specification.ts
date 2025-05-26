import { CircleSpecification } from '../circle.specification';

import type { Circle } from '../circle';

export class NoMembersCircleSpecification extends CircleSpecification {
  public isSatisfiedBy(target: Circle): boolean {
    return target.membersCount === 0;
  }
}
