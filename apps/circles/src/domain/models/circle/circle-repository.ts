import { type Circle } from './circle';
import { ICircleSpecification } from './circle.specification';
import { type CircleId } from './id/circle-id';
import { type CircleName } from './name/circle-name';

export interface ICircleRepository {
  findAllBy(criteria: ICircleSpecification): Promise<Iterable<Circle>>;
  getBy(id: CircleId): Promise<Circle | undefined>;
  getBy(name: CircleName): Promise<Circle | undefined>;
}
