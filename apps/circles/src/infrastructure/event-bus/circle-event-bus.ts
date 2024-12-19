import { EventBus } from './event-bus';
import { type CircleEvent } from '../../domain/models/circle';

export class CircleEventBus extends EventBus<CircleEvent> {}
