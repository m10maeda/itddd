import { CanNotChooseOwnerCandidateException } from './can-not-choose-owner-candidate.exception';
import { Member } from '../models/member';

import type { Circle } from '../models/circle';

export class OwnerCandidateChoicer {
  private readonly circle: Circle;

  public choose(): Member {
    if (this.circle.membersCount === 0)
      throw new CanNotChooseOwnerCandidateException();

    const [candidate] = this.circle.members;

    return new Member(candidate);
  }

  public constructor(circle: Circle) {
    this.circle = circle;
  }
}
