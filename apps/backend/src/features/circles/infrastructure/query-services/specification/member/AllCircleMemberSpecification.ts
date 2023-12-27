import { CircleMember, CircleMemberSpecification } from '../../../../domain';

export class AllCircleMemberSpecification extends CircleMemberSpecification {
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  public isSatisfiedBy(target: CircleMember): boolean {
    return true;
  }
}
