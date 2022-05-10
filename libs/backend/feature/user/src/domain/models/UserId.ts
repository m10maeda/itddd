export class UserId {
  private readonly value: string;

  public toString(): string {
    return this.value;
  }

  public equals(other: UserId): boolean {
    return this.value === other.value;
  }

  public constructor(value: string) {
    if (value === '') throw new Error('UserId must not be empty.');

    this.value = value;
  }
}
