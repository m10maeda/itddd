import { CircleName } from './circle-name';
import { InvalidCircleNameException } from './invalid-circle-name.exception';

describe('CircleName', () => {
  describe('should throw an error when attempting to create with invalid value', () => {
    it.each`
      value | description
      ${''} | ${'empty string'}
    `('with $description(`$value`)', ({ value }: { value: string }) => {
      expect(() => {
        new CircleName(value);
      }).toThrow(InvalidCircleNameException);
    });
  });

  describe('equals method', () => {
    it('should return true when specified object have the same value', () => {
      const sut = new CircleName('Baseball');
      const target = new CircleName('Baseball');

      expect(sut.equals(target)).toBeTrue();
    });

    it('should return false when specified object have the different value', () => {
      const sut = new CircleName('Baseball');
      const target = new CircleName('Football');

      expect(sut.equals(target)).toBeFalse();
    });
  });
});
