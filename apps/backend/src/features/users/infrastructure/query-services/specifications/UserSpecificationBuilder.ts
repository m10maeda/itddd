import { AllUserSpecification } from './AllUserSpecification';
import { MultipleIdQueryUserSpecification } from './MultipleIdQueryUserSpecification';
import { NameQueryUserSpecification } from './NameQueryUserSpecification';
import { IUserSpecification } from '../../../domain/models/IUserSpecification';
import { UserId } from '../../../domain/models/UserId';
import { IUserSpecificationBuilder } from '../IUserSpecificationBuilder';

export class UserSpecificationBuilder implements IUserSpecificationBuilder {
  public query(nameQuery: string): this {
    this.nameQuery = nameQuery;

    return this;
  }

  public include(ids: Iterable<UserId>): this {
    this.includeIds = ids;

    return this;
  }

  public exclude(ids: Iterable<UserId>): this {
    this.excludeIds = ids;

    return this;
  }

  public build(): IUserSpecification {
    let spec = new AllUserSpecification();

    if (this.nameQuery) {
      spec = spec.and(new NameQueryUserSpecification(this.nameQuery));
    }

    if (this.includeIds) {
      spec = spec.and(new MultipleIdQueryUserSpecification(this.includeIds));
    }

    if (this.excludeIds) {
      spec = spec.andNot(new MultipleIdQueryUserSpecification(this.excludeIds));
    }

    this.reset();

    return spec;
  }

  private nameQuery?: string;

  private includeIds?: Iterable<UserId>;

  private excludeIds?: Iterable<UserId>;

  private reset(): void {
    this.nameQuery = undefined;
    this.includeIds = undefined;
    this.excludeIds = undefined;
  }
}
