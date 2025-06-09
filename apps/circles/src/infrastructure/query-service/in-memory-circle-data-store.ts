import { ICircleDataAccess } from './circle-data-access';
import { CircleData } from '../../application/use-case/input-ports';
import {
  CircleAddedMember,
  CircleChangedOwner,
  CircleDeleted,
  CircleEvent,
  CircleRegistered,
  CircleRemovedMember,
  CircleRenamed,
  ICircleEventSubscriber,
} from '../../domain/models/circle';

export class InMemoryCircleDataStore
  implements ICircleDataAccess, ICircleEventSubscriber
{
  private circles: CircleData[];

  public async getAll(): Promise<Iterable<CircleData>> {
    return Promise.resolve(this.circles);
  }

  public async getBy(id: string): Promise<CircleData | undefined> {
    const circle = this.circles.find((circle) => circle.id === id);

    return Promise.resolve(circle);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async handle(event: CircleEvent): Promise<void> {
    if (event instanceof CircleRegistered) {
      this.circles = [
        ...this.circles,
        {
          id: event.id.toString(),
          name: event.name.toString(),
          owner: event.owner.toString(),
          members: [],
        },
      ];
    }

    if (event instanceof CircleDeleted) {
      this.circles = this.circles.filter(
        (circle) => circle.id !== event.id.toString(),
      );
    }

    if (event instanceof CircleRenamed) {
      this.circles = this.circles.map((circle) => {
        if (circle.id !== event.id.toString()) return circle;

        return new CircleData(
          circle.id,
          event.newName.toString(),
          circle.owner,
          circle.members,
        );
      });
    }

    if (event instanceof CircleAddedMember) {
      this.circles = this.circles.map((circle) => {
        if (circle.id !== event.id.toString()) return circle;

        return new CircleData(
          circle.id,
          circle.name,
          circle.owner,
          new Set([...circle.members, event.member.toString()]),
        );
      });
    }

    if (event instanceof CircleRemovedMember) {
      this.circles = this.circles.map((circle) => {
        if (circle.id !== event.id.toString()) return circle;

        return new CircleData(
          circle.id,
          circle.name,
          circle.owner,
          new Set(
            Array.from(circle.members).filter(
              (member) => member !== event.member.toString(),
            ),
          ),
        );
      });
    }

    if (event instanceof CircleChangedOwner) {
      this.circles = this.circles.map((circle) => {
        if (circle.id !== event.id.toString()) return circle;

        return new CircleData(
          circle.id,
          circle.name,
          event.owner.toString(),
          new Set(
            Array.from(circle.members).filter(
              (member) => member !== event.owner.toString(),
            ),
          ),
        );
      });
    }
  }

  public constructor(circles: Iterable<CircleData>) {
    this.circles = Array.from(circles);
  }
}
