import { UseCaseRequest } from '@itddd/backend-feature-shared';

export class CircleDeleteRequest extends UseCaseRequest {
  public readonly id: string;

  public constructor(id: string) {
    super();

    this.id = id;
  }
}
