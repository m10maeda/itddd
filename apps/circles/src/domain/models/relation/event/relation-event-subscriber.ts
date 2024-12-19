import { type RelationEvent } from './relation-event';
import { IEventSubscriber } from '../../shared';

export interface IRelationEventSubscriber<
  TEvent extends RelationEvent = RelationEvent,
> extends IEventSubscriber<TEvent> {}
