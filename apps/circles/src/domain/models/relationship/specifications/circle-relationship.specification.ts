import { RelationshipSpecification } from './relationship.specification';

import type { CircleId } from '../../circle';
import type { Relationship } from '../relationship';

export class CircleRelationshipSpecification extends RelationshipSpecification {
  private readonly circleId: CircleId;

  public isSatisfiedBy(relationship: Relationship): boolean {
    return relationship.circleId.equals(this.circleId);
  }

  public constructor(circleId: CircleId) {
    super();

    this.circleId = circleId;
  }
}
