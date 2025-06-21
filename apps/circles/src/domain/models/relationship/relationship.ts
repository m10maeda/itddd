import { RelationshipChangedRole } from './event';
import { Role } from './role';

import type { CircleId } from '../circle';
import type { MemberId } from '../member';

export class Relationship {
  public readonly circleId: CircleId;

  public readonly memberId: MemberId;

  private _role: Role;

  public get role(): Role {
    return this._role;
  }

  public change(role: Role): RelationshipChangedRole {
    this._role = role;

    return new RelationshipChangedRole(this.circleId, this.memberId, role);
  }

  public equals(other: Relationship): boolean {
    return (
      this.circleId.equals(other.circleId) &&
      this.memberId.equals(other.memberId)
    );
  }

  public isOwner(): boolean {
    return this._role === Role.Owner;
  }

  public constructor(circleId: CircleId, memberId: MemberId, role: Role) {
    this.circleId = circleId;
    this.memberId = memberId;
    this._role = role;
  }

  public static createMemberRelationshipOf(
    circleId: CircleId,
    memberId: MemberId,
  ): Relationship {
    return new Relationship(circleId, memberId, Role.Member);
  }

  public static createOwnerRelationshipOf(
    circleId: CircleId,
    memberId: MemberId,
  ): Relationship {
    return new Relationship(circleId, memberId, Role.Owner);
  }
}
