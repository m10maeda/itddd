export class CircleName {
  private readonly value: string;

  public toString(): string {
    return this.value;
  }

  public equals(other: CircleName): boolean {
    return this.value === other.value;
  }

  public constructor(value: string) {
    if (value === '') throw new Error('CircleName must not be empty.');

    this.value = value;
  }
}
