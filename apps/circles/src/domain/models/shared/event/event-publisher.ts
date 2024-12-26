import { type Event } from './event';

export interface IEventPublisher<TEvent extends Event> {
  publish(event: TEvent): Promise<void>;
}
