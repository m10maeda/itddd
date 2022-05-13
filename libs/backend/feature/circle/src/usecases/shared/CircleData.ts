export class CircleData {
  public readonly id: string;

  public readonly name: string;

  public readonly ownerId: string;

  public readonly memberIds: Iterable<string>;

  public constructor(
    id: string,
    name: string,
    ownerId: string,
    memberIds: Iterable<string>,
  ) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.memberIds = memberIds;
  }
}
