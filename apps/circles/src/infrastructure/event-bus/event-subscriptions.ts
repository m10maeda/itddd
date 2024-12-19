import { type EventSubscription } from './event-subscription';
import { type Event } from '../../domain/models/shared/event/event';

export class EventSubscriptions<TEvent extends Event>
  implements Iterable<EventSubscription<TEvent>>
{
  private readonly subscriptions: EventSubscription<TEvent>[];

  public add(
    subscription: EventSubscription<TEvent>,
  ): EventSubscriptions<TEvent> {
    return new EventSubscriptions(...this.subscriptions, subscription);
  }

  public remove(
    subscription: EventSubscription<TEvent>,
  ): EventSubscriptions<TEvent> {
    return new EventSubscriptions(
      ...this.subscriptions.filter(
        (_subscription) => !_subscription.equals(subscription),
      ),
    );
  }

  public [Symbol.iterator](): Iterator<EventSubscription<TEvent>, undefined> {
    return this.subscriptions[Symbol.iterator]();
  }

  public constructor(...subscriptions: EventSubscription<TEvent>[]) {
    this.subscriptions = subscriptions;
  }
}
