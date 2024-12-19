import { type RelationEvent } from './relation-event';
import { IEventPublisher } from '../../shared';

export interface IRelationEventPublisher
  extends IEventPublisher<RelationEvent> {}
