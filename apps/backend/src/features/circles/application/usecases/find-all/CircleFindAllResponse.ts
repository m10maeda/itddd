import { UseCaseResponse } from '../../../../shared/application/usecase';
import { CircleData } from '../shared';

export class CircleFindAllResponse extends UseCaseResponse {
  public readonly circles: Iterable<CircleData>;

  public readonly total: number;

  public constructor(circles: Iterable<CircleData>, total: number) {
    super();

    this.circles = circles;
    this.total = total;
  }
}
