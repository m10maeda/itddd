import { User, UserId } from '@itddd/backend-feature-user';

import { CircleId } from './CircleId';
import { CircleName } from './CircleName';
import { Members } from './Members';

export class Circle {
  public readonly id: CircleId;

  private _name: CircleName;

  public get name(): CircleName {
    return this._name;
  }

  private _owner: UserId;

  public get owner(): UserId {
    return this._owner;
  }

  private _members: Members;

  public get members(): Iterable<UserId> {
    return this._members;
  }

  public countMembers(): number {
    return this._members.count + 1; // count owner
  }

  public equals(other: Circle): boolean {
    return this.id.equals(other.id);
  }

  public contains(member: User): boolean {
    return this._owner.equals(member.id) || this._members.contains(member.id);
  }

  public renameTo(name: CircleName): void {
    this._name = name;
  }

  public join(member: User): void {
    this._members = this._members.add(member.id);
  }

  public leave(member: User): void {
    this._members = this._members.remove(member.id);
  }

  public constructor(
    id: CircleId,
    name: CircleName,
    owner: UserId,
    members?: Members,
  ) {
    this.id = id;
    this._name = name;
    this._owner = owner;
    this._members = members !== undefined ? members : new Members([]);
  }
}
