import { ISpecification, Specification } from '../shared';
import { type Circle } from './circle';

export interface ICircleSpecification extends ISpecification<Circle> {}

export abstract class CircleSpecification
  extends Specification<Circle>
  implements ICircleSpecification {}
