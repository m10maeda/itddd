import { UserType } from './UserType';

describe('equals method', () => {
  it('should return true, when comparing the same user type', () => {
    expect(UserType.Normal.equals(UserType.Normal)).toBe(true);
    expect(UserType.Premium.equals(UserType.Premium)).toBe(true);
  });

  it('should return true, when comparing the different user type', () => {
    expect(UserType.Normal.equals(UserType.Premium)).toBe(false);
    expect(UserType.Premium.equals(UserType.Normal)).toBe(false);
  });
});
