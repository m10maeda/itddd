import { type Circle } from './circle';
import { type CircleName } from './name';

export interface ICircleFactory {
  create(name: CircleName): Promise<Circle>;
}
