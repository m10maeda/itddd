import { type CircleMemberId } from './CircleMemberId';
import { UserType } from './UserType';

export class CircleMember {
  public readonly id: CircleMemberId;

  public eqeals(other: CircleMember): boolean {
    return this.id.equals(other.id);
  }

  public isPremiumUser(): boolean {
    return this.type === UserType.Premium;
  }

  public constructor(id: CircleMemberId, type: UserType) {
    this.id = id;
    this.type = type;
  }

  private readonly type: UserType;
}
