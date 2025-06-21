import { RelationshipSpecification } from './relationship.specification';
import { MemberId } from '../../member';

import type { Relationship } from '../relationship';

export class MemberRelationshipSpecification extends RelationshipSpecification {
  private readonly memberId: MemberId;

  public isSatisfiedBy(relationship: Relationship): boolean {
    return relationship.memberId.equals(this.memberId);
  }

  public constructor(memberId: MemberId) {
    super();

    this.memberId = memberId;
  }
}
