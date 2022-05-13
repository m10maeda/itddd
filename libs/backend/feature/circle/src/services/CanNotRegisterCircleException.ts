import { Circle } from '../domain/models';

export class CanNotRegisterCircleException extends Error {
  public readonly id: string;

  public readonly name: string;

  public constructor(circle: Circle, message: string) {
    super(message);

    this.id = circle.id.toString();
    this.name = circle.name.toString();
  }
}
