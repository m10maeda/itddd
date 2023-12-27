import { CircleFullException } from './CircleFullException';
import { type CircleFullSpecification } from './CircleFullSpecification';
import { type CircleId } from './CircleId';
import { type CircleMembers } from './CircleMembers';
import { type CircleName } from './CircleName';
import { type CircleMember, type CircleMemberId } from '../member';

export class Circle {
  public readonly id: CircleId;

  public get name(): CircleName {
    return this._name;
  }

  public get owner(): CircleMemberId {
    return this._members.owner;
  }

  public get members(): Iterable<CircleMemberId> {
    return this._members.members;
  }

  public get membersCount(): number {
    return this._members.count;
  }

  public equals(other: Circle): boolean {
    return this.id === other.id;
  }

  public renameTo(name: CircleName): void {
    this._name = name;
  }

  public assign(owner: CircleMember): void {
    this._members = this._members.updateOwner(owner.id);
  }

  public accept(member: CircleMember, spec: CircleFullSpecification): void {
    if (spec.isSatisfiedBy(this)) throw new CircleFullException(this.id);

    this._members = this._members.add(member.id);
  }

  public except(member: CircleMember): void {
    this._members = this._members.remove(member.id);
  }

  public constructor(id: CircleId, name: CircleName, members: CircleMembers) {
    this.id = id;
    this._name = name;
    this._members = members;
  }

  private _name: CircleName;

  private _members: CircleMembers;
}
