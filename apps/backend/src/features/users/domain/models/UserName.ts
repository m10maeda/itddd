export class UserName {
  public toString(): string {
    return this.value;
  }

  public equals(other: UserName): boolean {
    return this.value === other.value;
  }

  public constructor(value: string) {
    if (value === '') throw new RangeError('UserName must not be empty.');

    this.value = value;
  }

  private readonly value: string;
}
