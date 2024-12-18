import { type CircleData } from '../../application/use-case/input-ports';

export interface ICircleDataAccess {
  getAll(): Promise<Iterable<CircleData>>;
  getBy(id: string): Promise<CircleData | undefined>;
}
