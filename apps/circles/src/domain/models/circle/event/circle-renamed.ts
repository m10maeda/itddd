import { CircleEvent } from './circle-event';
import { type CircleId } from '../id/circle-id';
import { type CircleName } from '../name/circle-name';

export class CircleRenamed extends CircleEvent {
  public readonly lastName: CircleName;

  public readonly newName: CircleName;

  public constructor(id: CircleId, newName: CircleName, lastName: CircleName) {
    super(id);

    this.newName = newName;
    this.lastName = lastName;
  }
}
