import { EventBus } from './event-bus';
import { type RelationEvent } from '../../domain/models/relation';

export class RelationEventBus extends EventBus<RelationEvent> {}
