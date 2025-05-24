import { type ICircleEventLoader } from './circle-event-loader';
import {
  Circle,
  CircleAddedMember,
  CircleChangedOwner,
  CircleDeleted,
  type CircleEvent,
  CircleId,
  CircleName,
  CircleRegistered,
  CircleRemovedMember,
  CircleRenamed,
  type ICircleRepository,
  type ICircleSpecification,
  Members,
} from '../../../domain/models/circle';
import { Member } from '../../../domain/models/member';

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

    const circle = new Circle(
      registered.id,
      registered.name,
      registered.owner,
      new Members([]),
    );

    restEvents.forEach((event) => {
      if (event instanceof CircleRenamed) {
        circle.renameTo(event.newName);
      }

      if (event instanceof CircleChangedOwner) {
        circle.changeOwnerTo(new Member(event.owner));
      }

      if (event instanceof CircleAddedMember) {
        circle.add(new Member(event.member));
      }

      if (event instanceof CircleRemovedMember) {
        circle.remove(new Member(event.member));
      }
    });

    return circle;
  }

  public constructor(eventLoader: ICircleEventLoader) {
    this.eventLoader = eventLoader;
  }
}
