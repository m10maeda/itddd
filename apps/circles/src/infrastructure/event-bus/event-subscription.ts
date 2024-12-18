import { type Event } from '../../domain/models/shared/event/event';
import { IEventSubscriber } from '../../domain/models/shared/event/event-subscriber';

export type EventClass<TEvent extends Event> = abstract new (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => TEvent;

export class EventSubscription<TEvent extends Event> {
  private readonly Event: EventClass<TEvent>;

  private readonly subscriber: IEventSubscriber<TEvent>;

  public equals(other: EventSubscription<Event>): boolean {
    if (other.Event !== this.Event) return false;

    return this.subscriber === other.subscriber;
  }

  public async handle(event: TEvent): Promise<void> {
    if (!this.shouldHandle(event)) return;

    await this.subscriber.handle(event);
  }

  private shouldHandle(event: Event): boolean {
    return event instanceof this.Event;
  }

  public constructor(
    Event: EventClass<TEvent>,
    subscriber: IEventSubscriber<TEvent>,
  ) {
    this.Event = Event;
    this.subscriber = subscriber;
  }
}
