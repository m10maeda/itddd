import {
  ICircleRepository,
  ICircleSpecification,
  Circle,
  CircleId,
  CircleName,
  CircleMembers,
} from '../../domain';

export class InMemoryCircleRepository implements ICircleRepository {
  public async findBy(id: CircleId): Promise<Circle | undefined>;
  public async findBy(name: CircleName): Promise<Circle | undefined>;
  public async findBy(
    value: CircleId | CircleName,
  ): Promise<Circle | undefined> {
    const circle =
      value instanceof CircleId
        ? this.circles.get(value.toString())
        : this.toArray().find((_user) => _user.name.equals(value));

    if (circle === undefined) return Promise.resolve(undefined);

    return Promise.resolve(this.clone(circle));
  }

  public async findAllBy(
    criteria: ICircleSpecification,
  ): Promise<Iterable<Circle>> {
    const users = this.toArray().filter((user) => criteria.isSatisfiedBy(user));

    return Promise.resolve(users.map((user) => this.clone(user)));
  }

  public async save(circle: Circle): Promise<void> {
    this.circles.set(circle.id.toString(), circle);

    return Promise.resolve();
  }

  public async delete(circle: Circle): Promise<void> {
    this.circles.delete(circle.id.toString());

    return Promise.resolve();
  }

  public constructor(circles: Iterable<Circle> = []) {
    this.circles = new Map(
      Array.from(circles).map((circle) => [circle.id.toString(), circle]),
    );
  }

  private readonly circles: Map<ReturnType<CircleId['toString']>, Circle>;

  // eslint-disable-next-line class-methods-use-this
  private clone(circle: Circle): Circle {
    return new Circle(
      new CircleId(circle.id.toString()),
      new CircleName(circle.name.toString()),
      new CircleMembers(circle.owner, circle.members),
    );
  }

  private toArray(): readonly Circle[] {
    return Array.from(this.circles.values());
  }
}
