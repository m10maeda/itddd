import { type ProfileEvent } from './profile-event';

export interface IProfileEventSubscriber<TEvent extends ProfileEvent> {
  handle(event: TEvent): Promise<void>;
}
