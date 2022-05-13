import { User, UserId } from '@itddd/backend-feature-user';

export class CircleMembers implements Iterable<User> {
  private readonly owner: User;

  private readonly members: Map<ReturnType<UserId['toString']>, User>;

  public [Symbol.iterator](): Iterator<User> {
    return [this.owner, ...Array.from(this.members.values())][
      Symbol.iterator
    ]();
  }

  public countMembers(): number {
    return Array.from(this).length;
  }

  public countPremiumMembers(): number {
    const premiumMembers = Array.from(this).filter((member) =>
      member.isPremium(),
    );

    return premiumMembers.length;
  }

  public constructor(owner: User, members: Iterable<User>) {
    this.owner = owner;
    this.members = new Map(
      Array.from(members).map((member) => [member.id.toString(), member]),
    );
  }
}
