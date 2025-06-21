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
} from '../../../domain/models/circle';

export class CircleRepository implements ICircleRepository {
  private readonly eventLoader: ICircleEventLoader;

  public async getBy(id: CircleId): Promise<Circle | undefined>;
  public async getBy(name: CircleName): Promise<Circle | undefined>;
  public async getBy(
    idOrName: CircleId | CircleName,
  ): Promise<Circle | undefined> {
    if (idOrName instanceof CircleId)
      return this.replay(await this.eventLoader.loadAllBy(idOrName));

    const events =
      await this.eventLoader.loadRegisteredOrRenamedEventsWith(idOrName);
    const candidates = (
      await Promise.all(
        Array.from(events).map(async (event) => {
          const _events = await this.eventLoader.loadAllBy(event.id);
          return this.replay(_events);
        }),
      )
    ).filter((candidate): candidate is Circle => candidate !== undefined);

    return candidates.find((candidate) => candidate.name.equals(idOrName));
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
        circle.renameTo(event.newName);
      }
    });

    return circle;
  }

  public constructor(eventLoader: ICircleEventLoader) {
    this.eventLoader = eventLoader;
  }
}
