export class CircleNotFoundException extends Error {
  public readonly id: string;

  public constructor(id: string) {
    super(`Circle("${id}") not found"`);

    this.id = id;
  }
}
