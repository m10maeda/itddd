import type { Relationship } from './relationship';
import type { CircleId } from '../circle';
import type { MemberId } from '../member';
import type { IRelationSpecification } from './specifications';

export interface IRelationshipRepository {
  getAllBy(criteria: IRelationSpecification): Promise<Iterable<Relationship>>;
  getBy(
    circleId: CircleId,
    memberId: MemberId,
  ): Promise<Relationship | undefined>;
  getOwnerBy(circleId: CircleId): Promise<Relationship | undefined>;
}
