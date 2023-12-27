import { UseCaseResponse } from '../../../../shared/application/usecase';
import { CircleData } from '../shared';

export class CircleGetResponse extends UseCaseResponse {
  public readonly circle: CircleData;

  public constructor(circle: CircleData) {
    super();

    this.circle = circle;
  }
}
