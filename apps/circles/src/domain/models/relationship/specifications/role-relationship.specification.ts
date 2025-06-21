import { RelationshipSpecification } from './relationship.specification';

import type { Relationship } from '../relationship';
import type { Role } from '../role';

export class RoleRelationshipSpecification extends RelationshipSpecification {
  private readonly role: Role;

  public isSatisfiedBy(relationship: Relationship): boolean {
    return relationship.role === this.role;
  }

  public constructor(role: Role) {
    super();

    this.role = role;
  }
}
