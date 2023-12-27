import { type Circle } from './Circle';
import { CircleSpecification } from './CircleSpecification';
import { type CircleMember } from '../member';

export class CircleFullSpecification extends CircleSpecification {
  public isSatisfiedBy(target: Circle): boolean {
    if (target.membersCount < 30) return false;

    const premiumMembersCount = this.countPremiumUser();
    const max = premiumMembersCount > 10 ? 50 : 30;

    return target.membersCount >= max;
  }

  public constructor(allMembers: Iterable<CircleMember>) {
    super();

    this.allMembers = Array.from(allMembers);
  }

  private readonly allMembers: CircleMember[];

  private countPremiumUser(): number {
    return this.allMembers.filter((member) => member.isPremiumUser()).length;
  }
}
