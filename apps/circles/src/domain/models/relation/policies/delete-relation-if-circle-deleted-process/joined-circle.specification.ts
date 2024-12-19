import { type CircleId } from '../../../circle';
import { type Relation } from '../../relation';
import { RelationSpecification } from '../../relation.specification';

export class JoinedCircleSpecification extends RelationSpecification {
  private readonly target: CircleId;

  public isSatisfiedBy(target: Relation): boolean {
    return target.circle.equals(this.target);
  }

  public constructor(target: CircleId) {
    super();

    this.target = target;
  }
}
