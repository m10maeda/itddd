import { EventBus } from './event-bus';

import type {
  ICircleEventPublisher,
  CircleEvent,
} from '../../domain/models/circle';

export class CircleEventBus
  extends EventBus<CircleEvent>
  implements ICircleEventPublisher {}
