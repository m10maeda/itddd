import { UseCaseInputData } from '../use-case-input-data';

export class FindAllCirclesUseCaseInputData extends UseCaseInputData {
  public readonly page: number;

  public readonly size: number;

  public constructor(page = 1, size = 20) {
    super();

    this.page = page;
    this.size = size;
  }
}
