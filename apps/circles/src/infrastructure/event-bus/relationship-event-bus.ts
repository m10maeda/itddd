import { EventBus } from './event-bus';

import type {
  IRelationshipEventPublisher,
  RelationshipEvent,
} from '../../domain/models/relationship';

export class RelationshipEventBus
  extends EventBus<RelationshipEvent>
  implements IRelationshipEventPublisher {}
