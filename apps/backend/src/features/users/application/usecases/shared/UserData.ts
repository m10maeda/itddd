export class UserData {
  public readonly id: string;

  public readonly name: string;

  public readonly type: string;

  public constructor(id: string, name: string, type: string) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}
