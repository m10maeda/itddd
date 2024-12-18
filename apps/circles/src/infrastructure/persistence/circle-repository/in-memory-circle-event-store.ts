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

  public async loadLastRegisteredOrRenamedEventWith(
    name: CircleName,
  ): Promise<CircleRegistered | CircleRenamed | undefined> {
    const events = this.events.filter(
      (event): event is CircleRegistered | CircleRenamed => {
        if (event instanceof CircleRegistered || event instanceof CircleRenamed)
          return event.name.equals(name);

        return false;
      },
    );

    return Promise.resolve(events[events.length - 1]);
  }

  public constructor(events: Iterable<CircleEvent>) {
    this.events = Array.from(events);
  }
}
