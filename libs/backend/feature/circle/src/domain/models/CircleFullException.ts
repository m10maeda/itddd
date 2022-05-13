import { CircleId } from './CircleId';

export class CircleFullException extends Error {
  public readonly id: CircleId;

  public constructor(id: CircleId, message?: string) {
    super(message);

    this.id = id;
  }
}
