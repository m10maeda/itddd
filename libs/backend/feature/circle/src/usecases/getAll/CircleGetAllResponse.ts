import { UseCaseResponse } from '@itddd/backend-feature-shared';

import { CircleData } from '../shared';

export class CircleGetAllResponse extends UseCaseResponse {
  public readonly circles: Iterable<CircleData>;

  public constructor(circles: Iterable<CircleData>) {
    super();

    this.circles = circles;
  }
}
