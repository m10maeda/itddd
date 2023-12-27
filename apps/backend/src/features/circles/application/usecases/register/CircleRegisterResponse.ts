import { UseCaseResponse } from '../../../../shared/application/usecase';

export class CircleRegisterResponse extends UseCaseResponse {
  public readonly createdCircleId: string;

  public constructor(createdCircleId: string) {
    super();

    this.createdCircleId = createdCircleId;
  }
}
