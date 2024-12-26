import { CircleData } from '../dto';
import { UseCaseOutputData } from '../use-case-output-data';

export class GetCircleUseCaseOutputData extends UseCaseOutputData {
  public readonly circle: CircleData;

  public constructor(circle: CircleData) {
    super();

    this.circle = circle;
  }
}
