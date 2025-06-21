import { RelationshipEvent } from './relationship-event';

import type { CircleId } from '../../circle';
import type { MemberId } from '../../member';
import type { Role } from '../role';

export class RelationshipChangedRole extends RelationshipEvent {
  public readonly role: Role;

  public constructor(circleId: CircleId, memberId: MemberId, role: Role) {
    super(circleId, memberId);

    this.role = role;
  }
}
