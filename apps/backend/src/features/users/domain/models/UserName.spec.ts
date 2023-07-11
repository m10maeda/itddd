import { UserName } from './UserName';

describe('UserName', () => {
  describe('should throw an error, when the instance is constructed', () => {
    it.each`
      value | description
      ${''} | ${'empty'}
    `('with $description("$value")', ({ value }: { value: string }) => {
      expect(() => {
        // eslint-disable-next-line no-new
        new UserName(value);
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
        const a = new UserName(_a);
        const b = new UserName(_b);

        expect(a.equals(b)).toBe(expected);
        expect(b.equals(a)).toBe(expected);
      },
    );
  });
});
