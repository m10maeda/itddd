import { type CircleId } from '../circle';
import { type MemberId } from '../member';
import { type RelationType } from './relation-type';

export abstract class Relation {
  public readonly circle: CircleId;

  public readonly member: MemberId;

  private readonly type: RelationType;

  public equals(other: Relation): boolean {
    return this.circle.equals(other.circle) && this.member.equals(other.member);
  }

  public isOwner(): boolean {
    return this.type.isOwner();
  }

  public constructor(circle: CircleId, member: MemberId, type: RelationType) {
    this.circle = circle;
    this.member = member;
    this.type = type;
  }
}
