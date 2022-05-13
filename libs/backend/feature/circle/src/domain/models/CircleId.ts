export class CircleId {
  private readonly value: string;

  public toString(): string {
    return this.value;
  }

  public equals(other: CircleId): boolean {
    return this.value === other.value;
  }

  public constructor(value: string) {
    if (value === '') throw new Error('CircleId must not be empty.');

    this.value = value;
  }
}
