import { type ICircleDataAccess } from './circle-data-access';
import { CircleNotFoundException } from '../../application/use-case/exceptions';
import {
  GetCircleUseCaseInputData,
  GetCircleUseCaseOutputData,
  IGetCircleUseCaseInputPort,
} from '../../application/use-case/input-ports';

export class GetCircleQueryService implements IGetCircleUseCaseInputPort {
  private readonly dataAccess: ICircleDataAccess;

  public async handle(
    input: GetCircleUseCaseInputData,
  ): Promise<GetCircleUseCaseOutputData> {
    const circle = await this.dataAccess.getBy(input.id);

    if (circle === undefined) throw new CircleNotFoundException(input.id);

    return new GetCircleUseCaseOutputData(circle);
  }

  public constructor(dataAccess: ICircleDataAccess) {
    this.dataAccess = dataAccess;
  }
}
