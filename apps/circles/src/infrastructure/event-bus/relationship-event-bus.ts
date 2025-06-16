import { EventBus } from './event-bus';

import type { RelationshipEvent } from '../../domain/models/relationship';

export class RelationshipEventBus extends EventBus<RelationshipEvent> {}
