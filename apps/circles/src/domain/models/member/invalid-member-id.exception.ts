export class InvalidMemberIdException extends Error {
  public readonly value: string;

  public constructor(message: string, value: string) {
    super(message);

    this.value = value;
  }
}
