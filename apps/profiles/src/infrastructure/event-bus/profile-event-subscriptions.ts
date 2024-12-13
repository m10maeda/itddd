import { type ProfileEventSubscription } from './profile-event-subscription';
import { type ProfileEvent } from '../../domain/models';

export class ProfileEventSubscriptions
  implements Iterable<ProfileEventSubscription<ProfileEvent>>
{
  private readonly subscriptions: ProfileEventSubscription<ProfileEvent>[];

  public add<TEvent extends ProfileEvent>(
    subscription: ProfileEventSubscription<TEvent>,
  ): ProfileEventSubscriptions {
    return new ProfileEventSubscriptions(...this.subscriptions, subscription);
  }

  public remove<TEvent extends ProfileEvent>(
    subscription: ProfileEventSubscription<TEvent>,
  ): ProfileEventSubscriptions {
    return new ProfileEventSubscriptions(
      ...this.subscriptions.filter(
        (_subscription) => !_subscription.equals(subscription),
      ),
    );
  }

  public [Symbol.iterator](): Iterator<
    ProfileEventSubscription<ProfileEvent>,
    undefined
  > {
    return this.subscriptions[Symbol.iterator]();
  }

  public constructor(
    ...subscriptions: ProfileEventSubscription<ProfileEvent>[]
  ) {
    this.subscriptions = subscriptions;
  }
}
