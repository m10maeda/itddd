import { User, UserId, UserName, UserType } from '@itddd/backend-feature-user';

import { Circle } from './Circle';
import { CircleId } from './CircleId';
import { CircleName } from './CircleName';
import { Members } from './Members';

it('renameTo method should change name to recieved', () => {
  const name = new CircleName('Baseball');
  const circle = new Circle(new CircleId('0'), name, new UserId('0'));
  const newName = new CircleName('Love Baseball');

  expect(name.equals(newName)).toBe(false);

  circle.renameTo(newName);

  expect(circle.name.equals(newName)).toBe(true);
});

it('join method should add recieved member', () => {
  const circle = new Circle(
    new CircleId('0'),
    new CircleName('Baseball'),
    new UserId('owener'),
    new Members([new UserId('0')]),
  );

  const newUser = new User(
    new UserId('new'),
    new UserName('Alice'),
    UserType.Normal,
  );

  expect(circle.contains(newUser)).toBe(false);

  circle.join(newUser);

  expect(circle.contains(newUser)).toBe(true);
});

it('leave method should remove recieved member', () => {
  const circle = new Circle(
    new CircleId('0'),
    new CircleName('Baseball'),
    new UserId('owener'),
    new Members([new UserId('0'), new UserId('1')]),
  );

  const leftUser = new User(new UserId('0'), new UserName('Alice'));

  expect(circle.contains(leftUser)).toBe(true);

  circle.leave(leftUser);

  expect(circle.contains(leftUser)).toBe(false);
});
