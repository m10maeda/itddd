import { ICircleDataAccess } from './circle-data-access';
import { type CircleData } from '../../application/use-case/input-ports';
import {
  CircleDeleted,
  CircleEvent,
  CircleRegistered,
  CircleRenamed,
  ICircleEventSubscriber,
} from '../../domain/models/circle';
import {
  IRelationEventSubscriber,
  RelationCreated,
  RelationDeleted,
  RelationEvent,
} from '../../domain/models/relation';

export class InMemoryCircleDataStore
  implements ICircleDataAccess, ICircleEventSubscriber, IRelationEventSubscriber
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
  public async handle(event: CircleEvent | RelationEvent): Promise<void> {
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

        return {
          ...circle,
          name: event.name.toString(),
        };
      });
    }

    if (event instanceof RelationCreated) {
      this.circles = this.circles.map((circle) => {
        if (circle.id !== event.circle.toString()) return circle;

        if (event.type.isOwner())
          return {
            ...circle,
            owner: event.member.toString(),
          };

        return {
          ...circle,
          members: [...circle.members, event.member.toString()],
        };
      });
    }

    if (event instanceof RelationDeleted) {
      this.circles = this.circles.map((circle) => {
        if (circle.id !== event.circle.toString()) return circle;

        return {
          ...circle,
          members: Array.from(circle.members).filter(
            (member) => member !== event.member.toString(),
          ),
        };
      });
    }
  }

  public constructor(circles: Iterable<CircleData>) {
    this.circles = Array.from(circles);
  }
}
