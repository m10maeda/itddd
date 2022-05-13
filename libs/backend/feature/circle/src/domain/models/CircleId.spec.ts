import { CircleId } from './CircleId';

describe('should thorw error, if constructed with invalid values.', () => {
  it.each`
    value | description
    ${''} | ${'empty'}
  `('$description("$value")', ({ value }: { value: string }) => {
    expect(() => {
      // eslint-disable-next-line no-new
      new CircleId(value);
    }).toThrow();
  });
});

describe('equals method', () => {
  it.each`
    a      | b      | expected
    ${'0'} | ${'0'} | ${true}
    ${'0'} | ${'1'} | ${false}
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
      const a = new CircleId(_a);
      const b = new CircleId(_b);

      expect(a.equals(b)).toBe(expected);
      expect(b.equals(a)).toBe(expected);
    },
  );
});
