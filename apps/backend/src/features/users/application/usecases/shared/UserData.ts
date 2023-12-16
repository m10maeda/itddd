export enum UserType {
  Normal,
  Premium,
}

export class UserData {
  public readonly id: string;

  public readonly name: string;

  public readonly type: UserType;

  public isPremium(): boolean {
    return this.type === UserType.Premium;
  }

  public constructor(id: string, name: string, type: UserType) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}
