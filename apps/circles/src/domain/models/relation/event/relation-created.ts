import { RelationEvent } from './relation-event';
import { type CircleId } from '../../circle';
import { type MemberId } from '../../member';
import { type RelationType } from '../relation-type';

export class RelationCreated extends RelationEvent {
  public readonly type: RelationType;

  public constructor(circle: CircleId, member: MemberId, type: RelationType) {
    super(circle, member);

    this.type = type;
  }
}
