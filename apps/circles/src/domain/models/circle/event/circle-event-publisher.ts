import { type CircleEvent } from './circle-event';
import { IEventPublisher } from '../../shared';

export interface ICircleEventPublisher extends IEventPublisher<CircleEvent> {}
