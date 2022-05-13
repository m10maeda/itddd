import { UseCaseResponse } from '@itddd/backend-feature-shared';

import { CircleData } from '../shared';

export class CircleGetResponse extends UseCaseResponse {
  public readonly circle: CircleData;

  public constructor(circle: CircleData) {
    super();

    this.circle = circle;
  }
}
