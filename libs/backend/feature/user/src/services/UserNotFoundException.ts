import { UserId } from '../domain/models';

export class UserNotFoundException extends Error {
  public readonly id: string;

  public constructor(id: UserId, message: string) {
    super(message);

    this.id = id.toString();
  }
}
