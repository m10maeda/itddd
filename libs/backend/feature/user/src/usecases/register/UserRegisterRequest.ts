import { UseCaseRequest } from '@itddd/backend-feature-shared';

export class UserRegisterRequest extends UseCaseRequest {
  public readonly name: string;

  public constructor(name: string) {
    super();

    this.name = name;
  }
}
