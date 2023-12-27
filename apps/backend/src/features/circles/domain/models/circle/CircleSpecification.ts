import { type Circle } from './Circle';
import { ICircleSpecification } from './ICircleSpecification';
import { AbstractSpecification } from '../../../../shared/domain/models';

export abstract class CircleSpecification
  extends AbstractSpecification<Circle>
  implements ICircleSpecification {}
