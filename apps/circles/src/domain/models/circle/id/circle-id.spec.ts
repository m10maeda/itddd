import { CircleId } from './circle-id';
import { InvalidCircleIdException } from './invalid-circle-id.exception';

describe('CircleId', () => {
  describe('should throw an error when attempting to create with invalid value', () => {
    it.each`
      value | description
      ${''} | ${'empty string'}
    `('with $description(`$value`)', ({ value }: { value: string }) => {
      expect(() => {
        new CircleId(value);
      }).toThrow(InvalidCircleIdException);
    });
  });

  describe('equals method', () => {
    it('should return true when comparing objects with the same value', () => {
      const a = new CircleId('0');
      const b = new CircleId('0');

      expect(a.equals(b)).toBeTrue();
      expect(b.equals(a)).toBeTrue();
    });

    it('should return false when comparing objects with the different value', () => {
      const a = new CircleId('0');
      const b = new CircleId('1');

      expect(a.equals(b)).toBeFalse();
      expect(b.equals(a)).toBeFalse();
    });
  });
});
