export class CircleId {
  public toString(): string {
    return this.value;
  }

  public equals(other: CircleId): boolean {
    return this.value === other.value;
  }

  public constructor(value: string) {
    if (value === '') throw new RangeError('CircleId must not be empty.');

    this.value = value;
  }

  private readonly value: string;
}
