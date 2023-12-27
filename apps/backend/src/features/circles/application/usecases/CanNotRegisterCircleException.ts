import { Circle } from '../../domain';

export class CanNotRegisterCircleException extends Error {
  public readonly circle: Circle;

  public constructor(circle: Circle) {
    super(`Can not register circle("name: ${circle.name.toString()}").`);

    this.circle = circle;
  }
}
