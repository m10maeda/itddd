import { UseCaseResponse } from '@itddd/backend-feature-shared';

import { CircleSummaryData } from './CircleSummaryData';

export class CircleGetSummariesResponse extends UseCaseResponse {
  public readonly summaries: Iterable<CircleSummaryData>;

  public constructor(summaries: Iterable<CircleSummaryData>) {
    super();

    this.summaries = summaries;
  }
}
