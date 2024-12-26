import { type CircleId } from '../circle';
import { type MemberId } from '../member';
import { Relation } from './relation';
import { RelationType } from './relation-type';

export class OwnerRelation extends Relation {
  public constructor(circle: CircleId, owner: MemberId) {
    super(circle, owner, RelationType.Owner);
  }
}
