import { UseCaseRequest } from '@itddd/backend-feature-shared';

export class CircleGetRequest extends UseCaseRequest {
  public readonly id: string;

  public constructor(id: string) {
    super();

    this.id = id;
  }
}
