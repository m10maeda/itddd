import { AllCiecleSpecification } from './AllCirclesSpecification';
import { JoinedCiecleSpecification } from './JoinedCiecleSpecification';
import { NameQueryCircleSpecification } from './NameQueryUserSpecification';
import { OwnedCiecleSpecification } from './OwnedCiecleSpecification';
import {
  type CircleMemberId,
  type ICircleSpecification,
} from '../../../../domain';
import { ICircleSpecificationBuilder } from '../../ICircleSpecificationBuilder';

export class CircleSpecificationBuilder implements ICircleSpecificationBuilder {
  public query(nameQuery: string): this {
    this.nameQuery = nameQuery;

    return this;
  }

  public includeOwners(owners: Iterable<CircleMemberId>): this {
    this.includedOwners = owners;

    return this;
  }

  public excludeOwners(owners: Iterable<CircleMemberId>): this {
    this.excludedOwners = owners;

    return this;
  }

  public includeMembers(members: Iterable<CircleMemberId>): this {
    this.includedMembers = members;

    return this;
  }

  public excludeMembers(members: Iterable<CircleMemberId>): this {
    this.excludedMembers = members;

    return this;
  }

  public build(): ICircleSpecification {
    let spec = new AllCiecleSpecification();

    if (this.nameQuery) {
      spec = spec.and(new NameQueryCircleSpecification(this.nameQuery));
    }

    if (this.includedOwners) {
      Array.from(this.includedOwners).forEach((owner) => {
        spec = spec.and(new OwnedCiecleSpecification(owner));
      });
    }

    if (this.excludedOwners) {
      Array.from(this.excludedOwners).forEach((owner) => {
        spec = spec.andNot(new OwnedCiecleSpecification(owner));
      });
    }

    if (this.includedMembers) {
      Array.from(this.includedMembers).forEach((member) => {
        spec = spec.and(new JoinedCiecleSpecification(member));
      });
    }

    if (this.excludedMembers) {
      Array.from(this.excludedMembers).forEach((member) => {
        spec = spec.andNot(new JoinedCiecleSpecification(member));
      });
    }

    this.reset();

    return spec;
  }

  private nameQuery?: string;

  private includedOwners?: Iterable<CircleMemberId>;

  private excludedOwners?: Iterable<CircleMemberId>;

  private includedMembers?: Iterable<CircleMemberId>;

  private excludedMembers?: Iterable<CircleMemberId>;

  private reset(): void {
    this.nameQuery = undefined;
    this.includedOwners = undefined;
    this.excludedOwners = undefined;
    this.includedMembers = undefined;
    this.excludedMembers = undefined;
  }
}
