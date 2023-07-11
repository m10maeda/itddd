import { UseCaseResponse } from '../../../../shared/application/usecase';
import { UserData } from '../shared';

export class UserGetResponse extends UseCaseResponse {
  public readonly user: UserData;

  public constructor(user: UserData) {
    super();

    this.user = user;
  }
}
