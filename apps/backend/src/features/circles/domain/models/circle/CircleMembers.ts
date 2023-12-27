import { type CircleMemberId } from '../member';

export class CircleMembers implements Iterable<CircleMemberId> {
  public get owner(): CircleMemberId {
    return this._owner;
  }

  public get members(): Iterable<CircleMemberId> {
    return this._members.values();
  }

  public get count(): number {
    return this._members.size + 1;
  }

  public [Symbol.iterator](): Iterator<CircleMemberId> {
    return [this.owner, ...Array.from(this.members)][Symbol.iterator]();
  }

  public updateOwner(owner: CircleMemberId): CircleMembers {
    return new CircleMembers(owner, [
      ...Array.from(this.members).filter((_member) => !_member.equals(owner)),
      this.owner,
    ]);
  }

  public add(member: CircleMemberId): CircleMembers {
    return new CircleMembers(this.owner, [...Array.from(this.members), member]);
  }

  public remove(member: CircleMemberId): CircleMembers {
    return new CircleMembers(
      this.owner,
      Array.from(this.members).filter((_member) => !_member.equals(member)),
    );
  }

  public constructor(
    owner: CircleMemberId,
    members: Iterable<CircleMemberId> = [],
  ) {
    this._owner = owner;
    this._members = new Map(
      Array.from(members).map((member) => [member.toString(), member]),
    );
  }

  private _owner: CircleMemberId;

  private readonly _members: Map<
    ReturnType<CircleMemberId['toString']>,
    CircleMemberId
  >;
}
