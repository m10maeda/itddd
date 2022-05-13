import { CircleName } from './CircleName';

describe('should thorw error, if constructed with invalid values.', () => {
  it.each`
    value | description
    ${''} | ${'empty'}
  `('$description("$value")', ({ value }: { value: string }) => {
    expect(() => {
      // eslint-disable-next-line no-new
      new CircleName(value);
    }).toThrow();
  });
});

describe('equals method', () => {
  it.each`
    a             | b             | expected
    ${'Baseball'} | ${'Baseball'} | ${true}
    ${'Baseball'} | ${'Football'} | ${false}
  `(
    'should return $expected, in comparing "$a" and "$b"',
    ({
      a: _a,
      b: _b,
      expected,
    }: {
      a: string;
      b: string;
      expected: boolean;
    }) => {
      const a = new CircleName(_a);
      const b = new CircleName(_b);

      expect(a.equals(b)).toBe(expected);
      expect(b.equals(a)).toBe(expected);
    },
  );
});
