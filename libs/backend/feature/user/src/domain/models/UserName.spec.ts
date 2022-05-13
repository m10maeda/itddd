import { UserName } from './UserName';

describe('should thorw error, if constructed with invalid values.', () => {
  it.each`
    value | description
    ${''} | ${'empty'}
  `('$description("$value")', ({ value }: { value: string }) => {
    expect(() => {
      // eslint-disable-next-line no-new
      new UserName(value);
    }).toThrow();
  });
});

describe('equals method', () => {
  it.each`
    a          | b          | expected
    ${'Alice'} | ${'Alice'} | ${true}
    ${'Alice'} | ${'Bob'}   | ${false}
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
      const a = new UserName(_a);
      const b = new UserName(_b);

      expect(a.equals(b)).toBe(expected);
      expect(b.equals(a)).toBe(expected);
    },
  );
});
