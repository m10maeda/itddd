import { UserSpecification } from './UserSpecification';
import { User } from '../../../domain/models/User';
import { UserId } from '../../../domain/models/UserId';

export class MultipleIdQueryUserSpecification extends UserSpecification {
  public isSatisfiedBy(target: User): boolean {
    return this.ids.some((id) => id.equals(target.id));
  }

  public constructor(ids: Iterable<UserId>) {
    super();

    this.map = new Map(Array.from(ids).map((id) => [id.toString(), id]));
  }

  private readonly map: Map<ReturnType<UserId['toString']>, UserId>;

  private get ids(): UserId[] {
    return Array.from(this.map.values());
  }
}
