import {
  type ProfileEvent,
  type IProfileEventSubscriber,
} from '../../domain/models';

export type ProfileEventClass<TEvent extends ProfileEvent> = abstract new (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => TEvent;

export class ProfileEventSubscription<TEvent extends ProfileEvent> {
  private readonly Event: ProfileEventClass<TEvent>;

  private readonly subscriber: IProfileEventSubscriber<TEvent>;

  public equals(other: ProfileEventSubscription<TEvent>): boolean {
    if (other.Event !== this.Event) return false;

    return this.subscriber === other.subscriber;
  }

  public async handle(event: TEvent): Promise<void> {
    if (!this.shouldHandle(event)) return;

    await this.subscriber.handle(event);
  }

  private shouldHandle(event: TEvent): boolean {
    return event instanceof this.Event;
  }

  public constructor(
    Event: ProfileEventClass<TEvent>,
    subscriber: IProfileEventSubscriber<TEvent>,
  ) {
    this.Event = Event;
    this.subscriber = subscriber;
  }
}
