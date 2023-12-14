import { UserSpecification } from './UserSpecification';
import { User } from '../../../domain/models/User';

export class NameQueryUserSpecification extends UserSpecification {
  public isSatisfiedBy(target: User): boolean {
    return target.name.toString().includes(this.query);
  }

  public constructor(query: string) {
    super();

    this.query = query;
  }

  private readonly query: string;
}
