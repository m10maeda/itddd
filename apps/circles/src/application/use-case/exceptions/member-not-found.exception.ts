export class MemberNotFoundException extends Error {
  public readonly id: string;

  public constructor(id: string) {
    super(`Member("${id}") not found"`);

    this.id = id;
  }
}
