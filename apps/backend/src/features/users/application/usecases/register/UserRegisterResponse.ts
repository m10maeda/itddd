import { UseCaseResponse } from '../../../../shared/application/usecase';

export class UserRegisterResponse extends UseCaseResponse {
  public readonly createdUserId: string;

  public constructor(createdUserId: string) {
    super();

    this.createdUserId = createdUserId;
  }
}
