import { ICircleDataAccess } from './circle-data-access';
import { CircleData } from '../../application/use-case/input-ports';
import {
  CircleDeleted,
  CircleEvent,
  CircleRegistered,
  CircleRenamed,
  ICircleEventSubscriber,
} from '../../domain/models/circle';
import {
  IRelationshipEventSubscriber,
  RelationshipChangedRole,
  RelationshipCreated,
  RelationshipDeleted,
  RelationshipEvent,
  Role,
} from '../../domain/models/relationship';

export class InMemoryCircleDataStore
  implements
    ICircleDataAccess,
    ICircleEventSubscriber,
    IRelationshipEventSubscriber
{
  private readonly circles: Map<string, CircleData>;

  private readonly pendingCircles: Map<string, Omit<CircleData, 'owner'>>;

  public async getAll(): Promise<Iterable<CircleData>> {
    return Promise.resolve(this.circles.values());
  }

  public async getBy(id: string): Promise<CircleData | undefined> {
    const circle = this.circles.get(id);

    return Promise.resolve(circle);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async handle(event: CircleEvent | RelationshipEvent): Promise<void> {
    if (event instanceof CircleRegistered) {
      this.pendingCircles.set(event.id.toString(), {
        id: event.id.toString(),
        name: event.name.toString(),
        members: [],
      });

      return;
    }

    if (event instanceof CircleRenamed) {
      const circle = this.circles.get(event.id.toString());

      if (circle === undefined) return;

      this.circles.set(
        event.id.toString(),
        new CircleData(
          circle.id,
          event.newName.toString(),
          circle.owner,
          circle.members,
        ),
      );
    }

    if (event instanceof CircleDeleted) {
      this.circles.delete(event.id.toString());

      return;
    }

    if (event instanceof RelationshipCreated) {
      if (event.role === Role.Owner) {
        const pendingCircle = this.pendingCircles.get(
          event.circleId.toString(),
        );

        if (pendingCircle !== undefined) {
          this.circles.set(
            event.circleId.toString(),
            new CircleData(
              pendingCircle.id,
              pendingCircle.name,
              event.memberId.toString(),
              pendingCircle.members,
            ),
          );

          this.pendingCircles.delete(event.circleId.toString());

          return;
        }

        return;
      }

      const circle = this.circles.get(event.circleId.toString());

      if (circle === undefined) return;

      this.circles.set(
        event.circleId.toString(),
        new CircleData(circle.id, circle.name, circle.owner, [
          ...circle.members,
          event.memberId.toString(),
        ]),
      );

      return;
    }

    if (event instanceof RelationshipDeleted) {
      const circle = this.circles.get(event.circleId.toString());

      if (circle === undefined) return;

      if (event.memberId.toString() === circle.owner) {
        this.pendingCircles.set(event.circleId.toString(), {
          id: event.circleId.toString(),
          name: circle.name,
          members: circle.members,
        });

        return;
      }

      this.circles.set(
        event.circleId.toString(),
        new CircleData(
          circle.id,
          circle.name,
          circle.owner,
          Array.from(circle.members).filter(
            (member) => member !== event.memberId.toString(),
          ),
        ),
      );

      return;
    }

    if (event instanceof RelationshipChangedRole) {
      const circle = this.circles.get(event.circleId.toString());

      if (circle === undefined) return;

      if (event.role === Role.Owner) {
        const pendingCircle = this.pendingCircles.get(
          event.circleId.toString(),
        );

        if (pendingCircle !== undefined) {
          this.circles.set(
            event.circleId.toString(),
            new CircleData(
              pendingCircle.id,
              pendingCircle.name,
              event.memberId.toString(),
              Array.from(pendingCircle.members).filter(
                (member) => member !== event.memberId.toString(),
              ),
            ),
          );

          this.pendingCircles.delete(event.circleId.toString());

          return;
        }

        this.circles.set(
          event.circleId.toString(),
          new CircleData(
            circle.id,
            circle.name,
            event.memberId.toString(),
            Array.from(circle.members).filter(
              (member) => member !== event.memberId.toString(),
            ),
          ),
        );

        return;
      }

      this.pendingCircles.set(event.circleId.toString(), {
        id: event.circleId.toString(),
        name: circle.name,
        members: [...circle.members, event.memberId.toString()],
      });

      return;
    }
  }

  public constructor(circles: Iterable<CircleData>) {
    this.circles = new Map<string, CircleData>(
      Array.from(circles).map((circle) => [circle.id.toString(), circle]),
    );
    this.pendingCircles = new Map<string, Omit<CircleData, 'owner'>>();
  }
}
