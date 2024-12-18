import { InvalidCircleNameException } from './invalid-circle-name.exception';

export class CircleName {
  private readonly value: string;

  public equals(other: CircleName): boolean {
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
    if (value === '')
      throw new InvalidCircleNameException(
        'CircleName must not be empty.',
        value,
      );
    if (value.length > 20)
      throw new InvalidCircleNameException(
        'CircleName must be 20 characters or less.',
        value,
      );

    this.value = value;
  }
}
