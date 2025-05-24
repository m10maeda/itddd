import { type MemberId } from '../member';
import { type CircleId } from './id';

export class OwnerAlreadyOwnedException extends Error {
  public readonly circle: CircleId;

  public readonly owner: MemberId;

  public constructor(circle: CircleId, owner: MemberId) {
    super('Owner already owned');

    this.circle = circle;
    this.owner = owner;
  }
}
