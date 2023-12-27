import { type CircleMember } from './CircleMember';
import { ICircleMemberSpecification } from './ICircleMemberSpecification';
import { AbstractSpecification } from '../../../../shared/domain/models';

export abstract class CircleMemberSpecification
  extends AbstractSpecification<CircleMember>
  implements ICircleMemberSpecification
{
  public abstract isSatisfiedBy(target: CircleMember): boolean;
}
