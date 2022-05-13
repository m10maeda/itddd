import { User } from './User';
import { UserId } from './UserId';
import { UserName } from './UserName';
import { UserType } from './UserType';

it('default user type should be normal', () => {
  const user = new User(new UserId('0'), new UserName('Alice'));

  expect(user.type.equals(UserType.Normal)).toBe(true);
});

describe('equals method', () => {
  it('should return true when comparing same id user', () => {
    const a = new User(new UserId('0'), new UserName('Alice'), UserType.Normal);
    const b = new User(new UserId('0'), new UserName('Bob'), UserType.Premium);

    expect(a.equals(b)).toBe(true);
  });

  it('should return false when comparing different id user', () => {
    const a = new User(new UserId('0'), new UserName('Alice'), UserType.Normal);
    const b = new User(new UserId('1'), new UserName('Alice'), UserType.Normal);

    expect(a.equals(b)).toBe(false);
  });
});

it('renameTo method should change name to recieved', () => {
  const name = new UserName('Alice');
  const user = new User(new UserId('0'), name);
  const newName = new UserName('Bob');

  expect(name.equals(newName)).toBe(false);

  user.renameTo(newName);

  expect(user.name.equals(newName)).toBe(true);
});

it('upgrade method should change user type to premium', () => {
  const user = new User(
    new UserId('0'),
    new UserName('Alice'),
    UserType.Normal,
  );

  expect(user.type.equals(UserType.Premium)).toBe(false);

  user.upgrade();

  expect(user.type.equals(UserType.Premium)).toBe(true);
});

it('downgrade method should change user type to normal', () => {
  const user = new User(
    new UserId('0'),
    new UserName('Alice'),
    UserType.Premium,
  );

  expect(user.type.equals(UserType.Normal)).toBe(false);

  user.downgrade();

  expect(user.type.equals(UserType.Normal)).toBe(true);
});
