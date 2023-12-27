import { UseCaseRequest } from '../../../../shared/application/usecase';

export class CircleUpdateRequest extends UseCaseRequest {
  public readonly id: string;

  public readonly name: string;

  public constructor(id: string, name: string) {
    super();

    this.id = id;
    this.name = name;
  }
}
