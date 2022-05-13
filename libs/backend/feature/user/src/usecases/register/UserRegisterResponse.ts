import { UseCaseResponse } from '@itddd/backend-feature-shared';

export class UserRegisterResponse extends UseCaseResponse {
  public readonly createdUserId: string;

  public constructor(createdUserId: string) {
    super();

    this.createdUserId = createdUserId;
  }
}
