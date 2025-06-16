import type { RelationshipEvent } from './relationship-event';
import type { IEventPublisher } from '../../shared';

export interface IRelationshipEventPublisher
  extends IEventPublisher<RelationshipEvent> {}
