import { UserSpecification } from './UserSpecification';
import { User } from '../../../domain/models/User';

export class AllUserSpecification extends UserSpecification {
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  public isSatisfiedBy(target: User): boolean {
    return true;
  }
}
