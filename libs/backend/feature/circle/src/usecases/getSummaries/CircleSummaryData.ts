export class CircleSummaryData {
  public readonly id: string;

  public readonly name: string;

  public readonly ownerName: string;

  public constructor(id: string, name: string, ownerName: string) {
    this.id = id;
    this.name = name;
    this.ownerName = ownerName;
  }
}
