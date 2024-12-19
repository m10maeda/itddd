import { EventSubscription, type EventClass } from './event-subscription';
import { EventSubscriptions } from './event-subscriptions';
import { type Event } from '../../domain/models/shared/event/event';
import { IEventPublisher } from '../../domain/models/shared/event/event-publisher';
import { IEventSubscriber } from '../../domain/models/shared/event/event-subscriber';

export abstract class EventBus<TEvent extends Event>
  implements IEventPublisher<TEvent>
{
  private subscriptions: EventSubscriptions<TEvent>;

  public async publish(event: TEvent): Promise<void> {
    await Promise.all(
      Array.from(this.subscriptions).map(async (subscriber) =>
        subscriber.handle(event),
      ),
    );
  }

  public subscribe<T extends TEvent>(
    event: EventClass<T>,
    subscriber: IEventSubscriber<T>,
  ): void {
    this.subscriptions = this.subscriptions.add(
      new EventSubscription(event, subscriber),
    );
  }

  public unsubscribe<T extends TEvent>(
    event: EventClass<T>,
    subscriber: IEventSubscriber<T>,
  ): void {
    this.subscriptions = this.subscriptions.remove(
      new EventSubscription(event, subscriber),
    );
  }

  public constructor(subscriptions?: EventSubscriptions<TEvent>) {
    this.subscriptions = subscriptions ?? new EventSubscriptions<TEvent>();
  }
}
