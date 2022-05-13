import { UserId } from '@itddd/backend-feature-user';

export class Members implements Iterable<UserId> {
  private readonly members: Map<ReturnType<UserId['toString']>, UserId>;

  public [Symbol.iterator](): Iterator<UserId> {
    return this.members.values();
  }

  public get count(): number {
    return Array.from(this).length;
  }

  public contains(member: UserId): boolean {
    return this.members.has(member.toString());
  }

  public add(member: UserId): Members {
    return new Members([...Array.from(this), member]);
  }

  public remove(member: UserId): Members {
    return new Members(
      Array.from(this).filter((_member) => !_member.equals(member)),
    );
  }

  public constructor(members: Iterable<UserId>) {
    this.members = new Map(
      Array.from(members).map((member) => [member.toString(), member]),
    );
  }
}
