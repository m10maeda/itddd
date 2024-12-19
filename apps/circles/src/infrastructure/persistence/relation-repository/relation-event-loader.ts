import { type CircleId } from '../../../domain/models/circle';
import { type MemberId } from '../../../domain/models/member';
import {
  RelationCreated,
  type RelationEvent,
} from '../../../domain/models/relation';

export interface IRelationEventLoader {
  loadAllBy(
    circle: CircleId,
    member: MemberId,
  ): Promise<Iterable<RelationEvent>>;
  loadAllCreatedEvents(): Promise<Iterable<RelationCreated>>;
  loadAllCreatedEventsBy(circle: CircleId): Promise<Iterable<RelationEvent>>;
  loadAllCreatedEventsBy(member: MemberId): Promise<Iterable<RelationEvent>>;
}
