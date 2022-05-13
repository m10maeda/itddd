import { User, UserId, UserName, UserType } from '@itddd/backend-feature-user';

import { CircleFullSpecification } from './CircleFullSpecification';
import { CircleMembers } from './CircleMembers';

const makeCircleMembers = (
  normalUsersSize: number,
  premiumUsersSize: number,
): CircleMembers => {
  const [owner, ...normalUsers] = new Array(normalUsersSize)
    .fill('')
    .map(
      (_, index) =>
        new User(
          new UserId(`normal-${index}`),
          new UserName(`Normal_${index}`),
          UserType.Normal,
        ),
    );
  const premiumUsers = new Array(premiumUsersSize)
    .fill('')
    .map(
      (_, index) =>
        new User(
          new UserId(`premium-${index}`),
          new UserName(`Premium_${index}`),
          UserType.Premium,
        ),
    );

  const members = new CircleMembers(owner, [...normalUsers, ...premiumUsers]);

  return members;
};

describe('isSatisfiedBy method', () => {
  const fullSpec = new CircleFullSpecification();

  describe('should return true', () => {
    it('when circle has <= 30 members and < 10 premium users', () => {
      const premiumUsersSize = 9;
      const threshold = 30;
      const normalUsersSize = threshold - premiumUsersSize;
      const members = makeCircleMembers(normalUsersSize, premiumUsersSize);

      expect(fullSpec.isSatisfiedBy(members)).toBe(true);
    });

    it('when circle has <= 50 members and >= 10 premium users', () => {
      const premiumUsersSize = 10;
      const threshold = 50;
      const normalUsersSize = threshold - premiumUsersSize;
      const members = makeCircleMembers(normalUsersSize, premiumUsersSize);

      expect(fullSpec.isSatisfiedBy(members)).toBe(true);
    });
  });

  describe('should return false', () => {
    it('when circle has > 30 members and < 10 premium users', () => {
      const premiumUsersSize = 9;
      const threshold = 31;
      const normalUsersSize = threshold - premiumUsersSize;
      const members = makeCircleMembers(normalUsersSize, premiumUsersSize);

      expect(fullSpec.isSatisfiedBy(members)).toBe(false);
    });

    it('when circle has > 50 members and >= 10 premium users', () => {
      const premiumUsersSize = 10;
      const threshold = 51;
      const normalUsersSize = threshold - premiumUsersSize;
      const members = makeCircleMembers(normalUsersSize, premiumUsersSize);

      expect(fullSpec.isSatisfiedBy(members)).toBe(false);
    });
  });
});
