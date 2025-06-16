import type { CircleId } from '../../../domain/models/circle';
import type { MemberId } from '../../../domain/models/member';
import type {
  RelationshipCreated,
  RelationshipEvent,
} from '../../../domain/models/relationship';

export interface IRelationshipEventLoader {
  loadAll(): Promise<RelationshipEvent[]>;
  loadAllBy(
    circleId: CircleId,
    memberId: MemberId,
  ): Promise<RelationshipEvent[]>;
  loadAllCreated(): Promise<RelationshipCreated[]>;
}
