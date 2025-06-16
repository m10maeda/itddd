import { type Circle } from './circle';
import { type CircleId } from './id/circle-id';
import { type CircleName } from './name/circle-name';

export interface ICircleRepository {
  getBy(id: CircleId): Promise<Circle | undefined>;
  getBy(name: CircleName): Promise<Circle | undefined>;
}
