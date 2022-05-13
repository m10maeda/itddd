import { UserId } from '@itddd/backend-feature-user';

import {
  Circle,
  CircleId,
  CircleName,
  ICircleRepository,
  Members,
} from '../../domain/models';

export class InMemoryCircleRepository implements ICircleRepository {
  public async findBy(id: CircleId): Promise<Circle>;
  public async findBy(name: CircleName): Promise<Circle>;
  public async findBy(value: CircleId | CircleName): Promise<Circle> {
    if (value instanceof CircleId) {
      const user = this.circles.get(value.toString());

      return Promise.resolve(this.clone(user));
    }

    const user = this.toArray().find((_user) => _user.name.equals(value));

    return Promise.resolve(this.clone(user));
  }

  public async findAllBy(ids: Iterable<CircleId>): Promise<Iterable<Circle>> {
    const idArray = Array.from(ids);
    const circles = this.toArray().filter((circle) =>
      idArray.some((id) => id.equals(circle.id)),
    );

    return Promise.resolve(circles.map(this.clone));
  }

  public async findAll(): Promise<Iterable<Circle>> {
    return Promise.resolve(this.toArray().map(this.clone));
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

  // eslint-disable-next-line class-methods-use-this
  private clone(circle: Circle): Circle {
    if (circle === undefined) return undefined;

    return new Circle(
      new CircleId(circle.id.toString()),
      new CircleName(circle.name.toString()),
      new UserId(circle.owner.toString()),
      new Members(
        Array.from(circle.members).map(
          (memberId) => new UserId(memberId.toString()),
        ),
      ),
    );
  }

  private toArray(): Circle[] {
    return Array.from(this.circles.values());
  }

  private readonly circles: Map<ReturnType<CircleId['toString']>, Circle>;
}
