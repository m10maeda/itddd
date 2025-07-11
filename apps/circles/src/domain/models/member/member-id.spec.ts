import { describe, it, expect } from 'vitest';

import { InvalidMemberIdException } from './invalid-member-id.exception';
import { MemberId } from './member-id';

describe('MemberId', () => {
  describe('should throw an error when attempting to create with invalid value', () => {
    it.each`
      value | description
      ${''} | ${'empty string'}
    `('with $description(`$value`)', ({ value }: { value: string }) => {
      expect(() => {
        new MemberId(value);
      }).toThrow(InvalidMemberIdException);
    });
  });

  describe('equals method', () => {
    it('should return true when comparing objects with the same value', () => {
      const a = new MemberId('0');
      const b = new MemberId('0');

      expect(a.equals(b)).toBeTruthy();
      expect(b.equals(a)).toBeTruthy();
    });

    it('should return false when comparing objects with the different value', () => {
      const a = new MemberId('0');
      const b = new MemberId('1');

      expect(a.equals(b)).toBeFalsy();
      expect(b.equals(a)).toBeFalsy();
    });
  });
});
