export class RelationNotFoundException extends Error {
  public readonly circleId: string;

  public readonly memberId: string;

  public constructor(circleId: string, memberId: string) {
    super(
      `Relation({circleId: "${circleId}"}, memberId: "${memberId}") not found"`,
    );

    this.circleId = circleId;
    this.memberId = memberId;
  }
}
