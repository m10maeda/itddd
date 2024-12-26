export class InvalidCircleIdException extends Error {
  public readonly value: string;

  public constructor(message: string, value: string) {
    super(message);

    this.value = value;
  }
}
