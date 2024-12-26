import { type CircleEvent } from './circle-event';
import { IEventSubscriber } from '../../shared';

export interface ICircleEventSubscriber<
  TEvent extends CircleEvent = CircleEvent,
> extends IEventSubscriber<TEvent> {}
