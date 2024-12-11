export class ProfileId {
  private readonly value: string;

  public equals(other: ProfileId): boolean {
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
    if (value === '') throw new RangeError('ProfileId must not be empty.');

    this.value = value;
  }
}
