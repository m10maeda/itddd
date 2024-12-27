import { ICircleEventLoader } from './circle-event-loader';
import {
  type CircleId,
  type CircleEvent,
  CircleRegistered,
  type CircleName,
  CircleRenamed,
  ICircleEventSubscriber,
} from '../../../domain/models/circle';

export class InMemoryCircleEventStore
  implements ICircleEventLoader, ICircleEventSubscriber
{
  private readonly events: CircleEvent[];

  public async handle(event: CircleEvent): Promise<void> {
    this.events.push(event);

    return Promise.resolve();
  }

  public async loadAllBy(id: CircleId): Promise<Iterable<CircleEvent>> {
    return Promise.resolve(this.events.filter((event) => event.id.equals(id)));
  }

  public async loadAllRegisteredEvents(): Promise<Iterable<CircleRegistered>> {
    return Promise.resolve(
      this.events.filter((event) => event instanceof CircleRegistered),
    );
  }

  public async loadRegisteredOrRenamedEventsWith(
    name: CircleName,
  ): Promise<Iterable<CircleRegistered | CircleRenamed>> {
    return Promise.resolve(
      this.events.filter((event): event is CircleRegistered | CircleRenamed => {
        if (event instanceof CircleRegistered) return event.name.equals(name);
        if (event instanceof CircleRenamed) return event.newName.equals(name);

        return false;
      }),
    );
  }

  public constructor(events: Iterable<CircleEvent>) {
    this.events = Array.from(events);
  }
}
