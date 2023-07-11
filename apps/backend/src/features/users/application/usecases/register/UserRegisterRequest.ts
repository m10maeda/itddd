import { UseCaseRequest } from '../../../../shared/application/usecase';

export class UserRegisterRequest extends UseCaseRequest {
  public readonly name: string;

  public constructor(name: string) {
    super();

    this.name = name;
  }
}
