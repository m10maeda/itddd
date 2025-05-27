import { CanNotChooseOwnerCandidateException } from './can-not-choose-owner-candidate.exception';
import { Member } from '../models/member';

import type { Circle } from '../models/circle';

export class OwnerCandidateChoicer {
  private readonly circle: Circle;

  public choose(): Member {
    const [candidate] = this.circle.members;

    if (candidate === undefined)
      throw new CanNotChooseOwnerCandidateException();

    return new Member(candidate);
  }

  public constructor(circle: Circle) {
    this.circle = circle;
  }
}
