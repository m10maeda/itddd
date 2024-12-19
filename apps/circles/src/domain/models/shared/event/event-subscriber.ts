import { type Event } from './event';

export interface IEventSubscriber<TEvent extends Event> {
  handle(event: TEvent): Promise<void>;
}
