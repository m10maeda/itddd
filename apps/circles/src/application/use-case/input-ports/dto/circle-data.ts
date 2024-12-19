export class CircleData {
  public readonly id: string;

  public readonly members: Iterable<string>;

  public readonly name: string;

  public readonly owner: string;

  public constructor(
    id: string,
    name: string,
    owner: string,
    members: Iterable<string>,
  ) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.members = members;
  }
}
