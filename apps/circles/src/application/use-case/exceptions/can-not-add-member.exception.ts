export class CanNotAddMemberException extends Error {
  public readonly circle: string;
  public readonly member: string;

  public constructor(circle: string, member: string) {
    super(
      `Circle({id: "${circle}") can not add Member({member: "${member}"}})"`,
    );

    this.circle = circle;
    this.member = member;
  }
}
