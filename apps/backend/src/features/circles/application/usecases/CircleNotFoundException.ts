import { type CircleId } from '../../domain';

export class CircleNotFoundException extends Error {
  public readonly id: CircleId;

  public constructor(id: CircleId) {
    super(`Circle("id: ${id.toString()}") not found.`);

    this.id = id;
  }
}
