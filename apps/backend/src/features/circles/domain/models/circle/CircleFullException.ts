import { type CircleId } from './CircleId';

export class CircleFullException extends Error {
  public readonly id: CircleId;

  public constructor(id: CircleId) {
    super(
      `The maximum number of cirlce members in the circle("id: ${id.toString()}") has been reached.`,
    );

    this.id = id;
  }
}
