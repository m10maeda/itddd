import { UseCaseResponse } from '../../../../shared/application/usecase';
import { UserData } from '../shared';

export class UserGetAllResponse extends UseCaseResponse {
  public readonly users: Iterable<UserData>;

  public constructor(users: Iterable<UserData>) {
    super();

    this.users = users;
  }
}
