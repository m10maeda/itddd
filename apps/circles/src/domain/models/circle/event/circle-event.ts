import { Event } from '../../shared';
import { type CircleId } from '../id/circle-id';

export abstract class CircleEvent extends Event {
  public readonly id: CircleId;

  public constructor(id: CircleId) {
    super();

    this.id = id;
  }
}
