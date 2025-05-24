import { type MemberId } from '../../member';
import { type CircleId } from '../id';
import { CircleEvent } from './circle-event';

export class CircleRemovedMember extends CircleEvent {
  public readonly member: MemberId;

  public constructor(id: CircleId, member: MemberId) {
    super(id);

    this.member = member;
  }
}
