import { type ICircleDataAccess } from './circle-data-access';
import {
  type FindAllCirclesUseCaseInputData,
  FindAllCirclesUseCaseOutputData,
  IFindAllCirclesUseCaseInputPort,
} from '../../application/use-case/input-ports';

export class FindAllCirclesQueryService
  implements IFindAllCirclesUseCaseInputPort
{
  private readonly dataAccess: ICircleDataAccess;

  public async handle(
    input: FindAllCirclesUseCaseInputData,
  ): Promise<FindAllCirclesUseCaseOutputData> {
    const circles = Array.from(await this.dataAccess.getAll());
    const { page, size } = input;
    const chunk = Array.from(circles).slice((page - 1) * size, page * size);

    return new FindAllCirclesUseCaseOutputData(chunk);
  }

  public constructor(dataAccess: ICircleDataAccess) {
    this.dataAccess = dataAccess;
  }
}
