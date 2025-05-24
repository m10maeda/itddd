import { type MemberId } from '../../member';
import { type CircleId } from '../id';
import { CircleEvent } from './circle-event';

export class CircleChangedOwner extends CircleEvent {
  public readonly owner: MemberId;

  public constructor(id: CircleId, owner: MemberId) {
    super(id);

    this.owner = owner;
  }
}
