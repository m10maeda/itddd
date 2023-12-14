import { UseCaseResponse } from '../../../../shared/application/usecase';
import { UserData } from '../shared';

export class UserFindAllResponse extends UseCaseResponse {
  public readonly users: Iterable<UserData>;

  public readonly total: number;

  public constructor(users: Iterable<UserData>, total: number) {
    super();

    this.users = users;
    this.total = total;
  }
}
