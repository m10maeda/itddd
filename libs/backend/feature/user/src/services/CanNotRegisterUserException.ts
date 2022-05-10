import { User } from '../domain/models';

export class CanNotRegisterUserException extends Error {
  public readonly id: string;

  public readonly name: string;

  public constructor(user: User, message: string) {
    super(message);

    this.id = user.id.toString();
    this.name = user.name.toString();
  }
}
