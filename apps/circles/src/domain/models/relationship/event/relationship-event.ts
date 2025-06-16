import { Event } from '../../shared';

import type { CircleId } from '../../circle';
import type { MemberId } from '../../member';

export abstract class RelationshipEvent extends Event {
  public readonly circleId: CircleId;

  public readonly memberId: MemberId;

  public constructor(circleId: CircleId, memberId: MemberId) {
    super();

    this.circleId = circleId;
    this.memberId = memberId;
  }
}
