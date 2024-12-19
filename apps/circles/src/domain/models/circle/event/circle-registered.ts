import { CircleEvent } from './circle-event';
import { type MemberId } from '../../member';
import { type CircleId } from '../id/circle-id';
import { type CircleName } from '../name/circle-name';

export class CircleRegistered extends CircleEvent {
  public readonly name: CircleName;

  public readonly owner: MemberId;

  public constructor(id: CircleId, name: CircleName, owner: MemberId) {
    super(id);

    this.name = name;
    this.owner = owner;
  }
}
