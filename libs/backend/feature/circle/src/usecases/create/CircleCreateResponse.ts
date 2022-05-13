import { UseCaseResponse } from '@itddd/backend-feature-shared';

export class CircleCreateResponse extends UseCaseResponse {
  public readonly createdCiecleId: string;

  public constructor(createdCircleId: string) {
    super();

    this.createdCiecleId = createdCircleId;
  }
}
