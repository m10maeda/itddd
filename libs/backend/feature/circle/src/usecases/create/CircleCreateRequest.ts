import { UseCaseRequest } from '@itddd/backend-feature-shared';

export class CircleCreateRequest extends UseCaseRequest {
  public readonly name: string;

  public readonly ownerId: string;

  public constructor(name: string, ownerId: string) {
    super();

    this.name = name;
    this.ownerId = ownerId;
  }
}
