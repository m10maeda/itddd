import {
  type ProfileEventClass,
  ProfileEventSubscription,
} from './profile-event-subscription';
import { ProfileEventSubscriptions } from './profile-event-subscriptions';
import {
  type ProfileEvent,
  type IProfileEventPublisher,
  type IProfileEventSubscriber,
} from '../../domain/models';

export class ProfileEventBus implements IProfileEventPublisher {
  private subscriptions: ProfileEventSubscriptions;

  public async publish(event: ProfileEvent): Promise<void> {
    await Promise.all(
      Array.from(this.subscriptions).map(async (subscriber) =>
        subscriber.handle(event),
      ),
    );
  }

  public subscribe<TEvent extends ProfileEvent>(
    event: ProfileEventClass<TEvent>,
    subscriber: IProfileEventSubscriber<TEvent>,
  ): void {
    this.subscriptions = this.subscriptions.add(
      new ProfileEventSubscription(event, subscriber),
    );
  }

  public unsubscribe<TEvent extends ProfileEvent>(
    event: ProfileEventClass<TEvent>,
    subscriber: IProfileEventSubscriber<TEvent>,
  ): void {
    this.subscriptions = this.subscriptions.remove(
      new ProfileEventSubscription(event, subscriber),
    );
  }

  public constructor(
    subscriptions: ProfileEventSubscriptions = new ProfileEventSubscriptions(),
  ) {
    this.subscriptions = subscriptions;
  }
}
