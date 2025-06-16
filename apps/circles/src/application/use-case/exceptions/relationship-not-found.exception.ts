import type { CircleId } from '../../../domain/models/circle';
import type { MemberId } from '../../../domain/models/member';

export class RelationshipNotFoundException extends Error {
  public readonly circleId: CircleId;

  public readonly memberId: MemberId;

  public constructor(circleId: CircleId, memberId: MemberId) {
    super('Member already added');

    this.circleId = circleId;
    this.memberId = memberId;
  }
}
