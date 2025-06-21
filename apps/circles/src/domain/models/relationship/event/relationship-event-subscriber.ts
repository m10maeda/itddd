import type { RelationshipEvent } from './relationship-event';
import type { IEventSubscriber } from '../../shared';

export interface IRelationshipEventSubscriber<
  TEvent extends RelationshipEvent = RelationshipEvent,
> extends IEventSubscriber<TEvent> {}
