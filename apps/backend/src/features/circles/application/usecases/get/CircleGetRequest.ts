import { UseCaseRequest } from '../../../../shared/application/usecase';

export class CircleGetRequest extends UseCaseRequest {
  public readonly id: string;

  public constructor(id: string) {
    super();

    this.id = id;
  }
}
