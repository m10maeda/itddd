import { User } from './User';
import { UserId } from './UserId';
import { UserName } from './UserName';
import { UserType } from './UserType';

describe('User', () => {
  it('should default to normal user type', () => {
    const user = new User(new UserId('0'), new UserName('Alice'));

    expect(user.type).toBe(UserType.Normal);
  });

  describe('equals method', () => {
    it('should return true, when the specified user has same id', () => {
      const a = new User(
        new UserId('0'),
        new UserName('Alice'),
        UserType.Normal,
      );
      const b = new User(
        new UserId('0'),
        new UserName('Bob'),
        UserType.Premium,
      );

      expect(a.equals(b)).toBeTrue();
    });

    it('should return false, when the specified user has different id', () => {
      const a = new User(
        new UserId('0'),
        new UserName('Alice'),
        UserType.Normal,
      );
      const b = new User(
        new UserId('1'),
        new UserName('Alice'),
        UserType.Normal,
      );

      expect(a.equals(b)).toBeFalse();
    });
  });

  describe('renameTo method', () => {
    it('should change the user name with the specified id to the specified name', () => {
      const name = new UserName('Alice');
      const user = new User(new UserId('0'), name);
      const newName = new UserName('Bob');

      expect(user.name).not.toEqual(newName);

      user.renameTo(newName);

      expect(user.name).toEqual(newName);
    });
  });

  describe('upgrade method', () => {
    it('should change user type to premium', () => {
      const user = new User(
        new UserId('0'),
        new UserName('Alice'),
        UserType.Normal,
      );

      expect(user.type).not.toBe(UserType.Premium);

      user.upgrade();

      expect(user.type).toBe(UserType.Premium);
    });
  });

  describe('downgrade method', () => {
    it('should change user type to normal', () => {
      const user = new User(
        new UserId('0'),
        new UserName('Alice'),
        UserType.Premium,
      );

      expect(user.type).toBe(UserType.Premium);

      user.downgrade();

      expect(user.type).not.toBe(UserType.Premium);
    });
  });
});
