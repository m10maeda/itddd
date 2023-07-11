export class UserId {
  public toString(): string {
    return this.value;
  }

  public equals(other: UserId): boolean {
    return this.value === other.value;
  }

  public constructor(value: string) {
    if (value === '') throw new RangeError('UserId must not be empty.');

    this.value = value;
  }

  private readonly value: string;
}
