export class CircleName {
  public toString(): string {
    return this.value;
  }

  public equals(other: CircleName): boolean {
    return this.value === other.value;
  }

  public constructor(value: string) {
    if (value === '') throw new RangeError('CircleName must not be empty.');

    this.value = value;
  }

  private readonly value: string;
}
