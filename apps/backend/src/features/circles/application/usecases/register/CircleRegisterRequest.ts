import { UseCaseRequest } from '../../../../shared/application/usecase';

export class CircleRegisterRequest extends UseCaseRequest {
  public readonly name: string;

  public readonly owner: string;

  public constructor(name: string, owner: string) {
    super();

    this.name = name;
    this.owner = owner;
  }
}
