import { CircleEvent } from './circle-event';
import { type CircleId } from '../id/circle-id';
import { type CircleName } from '../name/circle-name';

export class CircleRenamed extends CircleEvent {
  public readonly name: CircleName;

  public constructor(id: CircleId, name: CircleName) {
    super(id);

    this.name = name;
  }
}
