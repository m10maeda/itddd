import { type ICircleEventLoader } from './circle-event-loader';
import {
  Circle,
  CircleDeleted,
  type CircleEvent,
  CircleId,
  CircleName,
  CircleRegistered,
  CircleRenamed,
  type ICircleRepository,
  type ICircleSpecification,
} from '../../../domain/models/circle';

export class CircleRepository implements ICircleRepository {
  private readonly eventLoader: ICircleEventLoader;

  public async findAllBy(
    criteria: ICircleSpecification,
  ): Promise<Iterable<Circle>> {
    const allRegisteredEvents =
      await this.eventLoader.loadAllRegisteredEvents();

    const circles = (
      await Promise.all(
        Array.from(allRegisteredEvents).map(async (event) =>
          this.getBy(event.id),
        ),
      )
    ).filter((circle): circle is Circle => circle !== undefined);

    const chunk = circles.filter(
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async (circle) => await criteria.isSatisfiedBy(circle),
    );

    return chunk;
  }

  public async getBy(id: CircleId): Promise<Circle | undefined>;
  public async getBy(name: CircleName): Promise<Circle | undefined>;
  public async getBy(
    idOrName: CircleId | CircleName,
  ): Promise<Circle | undefined> {
    const id = await this.takeId(idOrName);

    if (id === undefined) return undefined;

    const events = await this.eventLoader.loadAllBy(id);

    return this.replay(events);
  }

  private replay(events: Iterable<CircleEvent>): Circle | undefined {
    if (Array.from(events).length === 0) return undefined;
    if (Array.from(events).some((event) => event instanceof CircleDeleted))
      return undefined;

    const registered = Array.from(events).find(
      (event): event is CircleRegistered => event instanceof CircleRegistered,
    );

    if (registered === undefined) return undefined;

    const restEvents = Array.from(events).filter(
      (event) => !(event instanceof CircleRegistered),
    );

    const circle = new Circle(registered.id, registered.name);

    restEvents.forEach((event) => {
      if (event instanceof CircleRenamed) {
        circle.renameTo(event.name);
      }
    });

    return circle;
  }

  private async takeId(
    idOrName: CircleId | CircleName,
  ): Promise<CircleId | undefined> {
    if (idOrName instanceof CircleId) return idOrName;

    const registeredOrRenamedEvent =
      await this.eventLoader.loadLastRegisteredOrRenamedEventWith(idOrName);

    return registeredOrRenamedEvent?.id;
  }

  public constructor(eventLoader: ICircleEventLoader) {
    this.eventLoader = eventLoader;
  }
}
