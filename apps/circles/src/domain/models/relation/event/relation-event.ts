import { type CircleId } from '../../circle';
import { type MemberId } from '../../member';
import { Event } from '../../shared';

export class RelationEvent extends Event {
  public readonly circle: CircleId;

  public readonly member: MemberId;

  public constructor(circle: CircleId, member: MemberId) {
    super();

    this.circle = circle;
    this.member = member;
  }
}
