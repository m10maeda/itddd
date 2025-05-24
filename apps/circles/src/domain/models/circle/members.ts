import type { MemberId } from '../member';

export class Members implements Iterable<MemberId> {
  private readonly members: MemberId[];

  public get size(): number {
    return this.members.length;
  }

  public add(member: MemberId): Members {
    if (this.has(member)) return this;

    return new Members([...this.members, member]);
  }

  public has(member: MemberId): boolean {
    return this.members.some((_member) => _member.equals(member));
  }

  public remove(member: MemberId): Members {
    if (!this.has(member)) return this;

    return new Members(
      this.members.filter((_member) => !_member.equals(member)),
    );
  }

  public [Symbol.iterator](): Iterator<MemberId> {
    return this.members[Symbol.iterator]();
  }

  public constructor(members: MemberId[]) {
    this.members = members;
  }
}
