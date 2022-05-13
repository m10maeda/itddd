import { CircleId } from '../domain/models';

export class CircleNotFoundException extends Error {
  public readonly id: string;

  public constructor(id: CircleId, message: string) {
    super(message);

    this.id = id.toString();
  }
}
