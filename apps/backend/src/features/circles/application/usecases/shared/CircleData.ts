export type CircleMemberId = string;

export class CircleData {
  public readonly id: string;

  public readonly name: string;

  public readonly owner: CircleMemberId;

  public readonly members: CircleMemberId[];

  public constructor(
    id: string,
    name: string,
    owner: CircleMemberId,
    members: CircleMemberId[],
  ) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.members = members;
  }
}
