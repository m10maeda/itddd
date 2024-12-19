import { type CircleId } from '../circle';
import { type MemberId } from '../member';
import { type Relation } from './relation';
import { type IRelationSpecification } from './relation.specification';

export interface IRelationRepository {
  findAllBy(criteria: IRelationSpecification): Promise<Iterable<Relation>>;
  getAllBy(circle: CircleId): Promise<Iterable<Relation>>;
  getAllBy(member: MemberId): Promise<Iterable<Relation>>;
  getBy(circle: CircleId, member: MemberId): Promise<Relation | undefined>;
  getOwnerRelationBy(circle: CircleId): Promise<Relation | undefined>;
}
