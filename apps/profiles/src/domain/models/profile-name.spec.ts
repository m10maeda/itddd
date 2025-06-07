import { describe, it, expect } from 'vitest';

import { ProfileName } from './profile-name';

describe('ProfileName', () => {
  describe('should throw an error when attempting to create with invalid value', () => {
    it.each`
      value                      | description
      ${'aa'}                    | ${'less than 3 characters'}
      ${'aaaaaaaaaaaaaaaaaaaaa'} | ${'greater than 20 characters'}
    `('with $description(`$value`)', ({ value }: { value: string }) => {
      expect(() => {
        new ProfileName(value);
      }).toThrow(Error);
    });
  });

  describe('equals method', () => {
    it('should return true when specified object have the same value', () => {
      const sut = new ProfileName('Alice');
      const target = new ProfileName('Alice');

      expect(sut.equals(target)).toBeTruthy();
    });

    it('should return false when specified object have the different value', () => {
      const sut = new ProfileName('Alice');
      const target = new ProfileName('Bob');

      expect(sut.equals(target)).toBeFalsy();
    });
  });
});
