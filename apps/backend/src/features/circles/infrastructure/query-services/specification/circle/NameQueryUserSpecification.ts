import { type Circle, CircleSpecification } from '../../../../domain';

export class NameQueryCircleSpecification extends CircleSpecification {
  public isSatisfiedBy(target: Circle): boolean {
    return target.name.toString().includes(this.query);
  }

  public constructor(query: string) {
    super();

    this.query = query;
  }

  private readonly query: string;
}
