import { type CircleId } from '../../circle';
import { type MemberId } from '../../member';
import { Event } from '../../shared';
import { type RelationType } from '../relation-type';

export class RelationEvent extends Event {
  public readonly circle: CircleId;

  public readonly member: MemberId;

  public readonly type: RelationType;

  public constructor(circle: CircleId, member: MemberId, type: RelationType) {
    super();

    this.circle = circle;
    this.member = member;
    this.type = type;
  }
}
