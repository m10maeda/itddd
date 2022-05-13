import { UseCaseRequest } from '@itddd/backend-feature-shared';

export class CircleGetSummariesRequest extends UseCaseRequest {
  public readonly page: number;

  public readonly size: number;

  public constructor(page: number, size: number) {
    super();

    this.page = page;
    this.size = size;
  }
}
