import { User } from '../../domain';

export class CanNotRegisterUserException extends Error {
  public readonly user: User;

  public constructor(user: User) {
    super(`Can not register user("name: ${user.name.toString()}").`);

    this.user = user;
  }
}
