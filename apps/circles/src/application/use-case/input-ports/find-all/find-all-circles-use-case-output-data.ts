import { type CircleData } from '../dto';
import { UseCaseOutputData } from '../use-case-output-data';

export class FindAllCirclesUseCaseOutputData extends UseCaseOutputData {
  public readonly circles: Iterable<CircleData>;

  public constructor(circles: Iterable<CircleData>) {
    super();

    this.circles = circles;
  }
}
