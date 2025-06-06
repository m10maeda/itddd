import { Member, type MemberId } from '../member';
import {
  CircleAddedMember,
  CircleChangedOwner,
  CircleRemovedMember,
  CircleRenamed,
} from './event';
import { type CircleId } from './id/circle-id';
import { MemberAlreadyAddedException } from './member-already-added.exception';
import { MemberDoesNotJoinedException } from './member-does-not-joined.exception';
import { Members } from './members';
import { type CircleName } from './name/circle-name';
import { OwnerAlreadyOwnedException } from './owner-already-owned.exception';

export class Circle {
  public readonly id: CircleId;

  private _members: Members;

  private _name: CircleName;

  private _owner: MemberId;

  public get members(): MemberId[] {
    return Array.from(this._members);
  }

  public get membersCount(): number {
    return this._members.size;
  }

  public get name(): CircleName {
    return this._name;
  }

  public get owner(): MemberId {
    return this._owner;
  }

  public add(member: Member): CircleAddedMember {
    if (this._members.has(member.id))
      throw new MemberAlreadyAddedException(this.id, member.id);

    this._members = this._members.add(member.id);

    return new CircleAddedMember(this.id, member.id);
  }

  public changeOwnerTo(owner: Member): CircleChangedOwner {
    if (this.owner.equals(owner.id))
      throw new OwnerAlreadyOwnedException(this.id, owner.id);

    this._owner = owner.id;

    if (this.joins(owner)) {
      this._members = this._members.remove(owner.id);
    }

    return new CircleChangedOwner(this.id, owner.id);
  }

  public joins(member: Member): boolean {
    return this._members.has(member.id);
  }

  public owns(member: Member): boolean {
    return this._owner.equals(member.id);
  }

  public remove(member: Member): CircleRemovedMember {
    if (!this._members.has(member.id))
      throw new MemberDoesNotJoinedException(this.id, member.id);

    this._members = this._members.remove(member.id);

    return new CircleRemovedMember(this.id, member.id);
  }

  public renameTo(name: CircleName): CircleRenamed {
    const event = new CircleRenamed(this.id, name, this.name);

    this._name = name;

    return event;
  }

  public constructor(
    id: CircleId,
    name: CircleName,
    owner: MemberId,
    members: Members,
  ) {
    this.id = id;
    this._name = name;
    this._owner = owner;
    this._members = members;
  }
}
