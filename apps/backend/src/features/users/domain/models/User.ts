import { UserId } from './UserId';
import { UserName } from './UserName';
import { UserType } from './UserType';

export class User {
  public readonly id: UserId;

  public get name(): UserName {
    return this._name;
  }

  public get type(): UserType {
    return this._type;
  }

  public equals(other: User): boolean {
    return this.id.equals(other.id);
  }

  public isNormal(): boolean {
    return this._type.isNormal();
  }

  public isPremium(): boolean {
    return this._type.isPremium();
  }

  public renameTo(name: UserName): void {
    this._name = name;
  }

  public upgrade(): void {
    this._type = this.type.upgrade();
  }

  public downgrade(): void {
    this._type = this.type.downgrade();
  }

  public constructor(
    id: UserId,
    name: UserName,
    type: UserType = UserType.Normal,
  ) {
    this.id = id;
    this._name = name;
    this._type = type;
  }

  private _name: UserName;

  private _type: UserType;
}
