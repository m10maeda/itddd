export class ProfileName {
  private readonly value: string;

  public equals(other: ProfileName): boolean {
    return this.value === other.value;
  }

  /* eslint-disable @typescript-eslint/unified-signatures */
  public [Symbol.toPrimitive](hint: 'number'): null;
  public [Symbol.toPrimitive](hint: 'string'): string;
  public [Symbol.toPrimitive](hint: 'default'): string;
  public [Symbol.toPrimitive](): string;
  /* eslint-enable @typescript-eslint/unified-signatures */
  public [Symbol.toPrimitive](
    hint: 'number' | 'string' | 'default' = 'default',
  ): string | null {
    if (hint === 'number') return null;

    return this.value;
  }

  public toString(): string {
    return this.value;
  }

  public valueOf(): string {
    return this.value;
  }

  public constructor(value: string) {
    if (value.length < 3)
      throw new RangeError('ProfileName must be at least 3 characters long.');
    if (value.length > 20)
      throw new RangeError('ProfileName must be 20 characters or less.');

    this.value = value;
  }
}
