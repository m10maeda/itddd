import { CircleMembers } from './CircleMembers';

export class CircleFullSpecification {
  // eslint-disable-next-line class-methods-use-this
  public isSatisfiedBy(members: CircleMembers): boolean {
    const premiumMemberCount = members.countPremiumMembers();
    const circleUpperLimit = premiumMemberCount < 10 ? 30 : 50;

    return members.countMembers() <= circleUpperLimit;
  }
}
