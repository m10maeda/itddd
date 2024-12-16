import { type CircleId } from '../circle';
import { type MemberId } from '../member';
import { Relation } from './relation';
import { RelationType } from './relation-type';

export class MemberRelation extends Relation {
  public constructor(circle: CircleId, member: MemberId) {
    super(circle, member, RelationType.Member);
  }
}
