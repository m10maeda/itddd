import { UseCaseInputData } from '../use-case-input-data';

export class GetCircleUseCaseInputData extends UseCaseInputData {
  public readonly id: string;

  public constructor(id: string) {
    super();

    this.id = id;
  }
}
