import { UserId } from '../../domain';

export class UserNotFoundException extends Error {
  public readonly id: UserId;

  public constructor(id: UserId) {
    super(`User("id: ${id.toString()}") not found.`);

    this.id = id;
  }
}
