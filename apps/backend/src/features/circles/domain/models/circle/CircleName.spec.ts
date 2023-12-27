import { CircleName } from './CircleName';

describe('CircleName', () => {
  describe('should throw an error, when the instance is constructed', () => {
    it.each`
      value | description
      ${''} | ${'empty'}
    `('with $description("$value")', ({ value }: { value: string }) => {
      expect(() => {
        // eslint-disable-next-line no-new
        new CircleName(value);
      }).toThrow(RangeError);
    });
  });

  describe('equals method', () => {
    it.each`
      a          | b          | expected
      ${'Alice'} | ${'Alice'} | ${true}
      ${'Alice'} | ${'Bob'}   | ${false}
    `(
      'should return $expected, when "$a" and "$b" are compared',
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
});
