import { PageInfo } from './PageInfo';

describe('PageInfo', () => {
  describe('should throw an error, when the instance is constructed', () => {
    it.each`
      page  | size  | description
      ${-1} | ${1}  | ${'page is negative'}
      ${0}  | ${1}  | ${'page is 0'}
      ${1}  | ${-1} | ${'size is negative'}
      ${1}  | ${0}  | ${'size is 0'}
    `(
      'with $description("page: $page, size: $size")',
      ({ page, size }: { page: number; size: number }) => {
        expect(() => {
          // eslint-disable-next-line no-new
          new PageInfo(page, size);
        }).toThrow(RangeError);
      },
    );
  });

  describe('chunk method', () => {
    it.each`
      items                 | page | size  | expected
      ${[0, 1, 2, 3, 4, 5]} | ${1} | ${2}  | ${[0, 1]}
      ${[0, 1, 2, 3, 4, 5]} | ${1} | ${10} | ${[0, 1, 2, 3, 4, 5]}
      ${[0, 1, 2, 3, 4, 5]} | ${2} | ${2}  | ${[2, 3]}
      ${[0, 1, 2, 3, 4, 5]} | ${2} | ${5}  | ${[5]}
      ${[0, 1, 2, 3, 4, 5]} | ${3} | ${5}  | ${[]}
    `(
      'should return chunked items',
      ({
        items,
        page,
        size,
        expected,
      }: {
        items: number[];
        page: number;
        size: number;
        expected: number[];
      }) => {
        const sut = new PageInfo(page, size);
        const result = sut.chunk(items);

        expect(result).toEqual(expected);
      },
    );
  });
});
