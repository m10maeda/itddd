import { UseCaseRequest } from '../../../../shared/application/usecase';

export class UserGetRequest extends UseCaseRequest {
  public readonly id: string;

  public constructor(id: string) {
    super();

    this.id = id;
  }
}
