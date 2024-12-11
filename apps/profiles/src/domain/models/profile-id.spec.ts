import { ProfileId } from './profile-id';

describe('ProfileId', () => {
  describe('should throw an error when attempting to create with invalid value', () => {
    it.each`
      value | description
      ${''} | ${'empty string'}
    `('with $description(`$value`)', ({ value }: { value: string }) => {
      expect(() => {
        new ProfileId(value);
      }).toThrow(Error);
    });
  });

  describe('equals method', () => {
    it('should return true when comparing objects with the same value', () => {
      const a = new ProfileId('0');
      const b = new ProfileId('0');

      expect(a.equals(b)).toBeTrue();
      expect(b.equals(a)).toBeTrue();
    });

    it('should return false when comparing objects with the different value', () => {
      const a = new ProfileId('0');
      const b = new ProfileId('1');

      expect(a.equals(b)).toBeFalse();
      expect(b.equals(a)).toBeFalse();
    });
  });
});
