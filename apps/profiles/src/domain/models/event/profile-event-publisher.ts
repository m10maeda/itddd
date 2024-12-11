import { type ProfileEvent } from './profile-event';

export interface IProfileEventPublisher {
  publish(event: ProfileEvent): Promise<void>;
}
