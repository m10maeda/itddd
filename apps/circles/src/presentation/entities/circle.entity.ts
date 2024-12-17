import { CircleData } from '../../application/use-case/input-ports';

export class Circle {
  public readonly id: string;

  public readonly members: string[];

  public readonly name: string;

  public readonly owner: string;

  public constructor(
    id: string,
    name: string,
    owner: string,
    members: string[],
  ) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.members = members;
  }

  public static create(circle: CircleData): Circle {
    return new Circle(
      circle.id,
      circle.name,
      circle.owner,
      Array.from(circle.members),
    );
  }
}
