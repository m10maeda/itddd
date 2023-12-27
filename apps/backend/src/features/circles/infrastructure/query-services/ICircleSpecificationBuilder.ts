import { type CircleMemberId, ICircleSpecification } from '../../domain';

export interface ICircleSpecificationBuilder {
  query(query: string): this;
  includeOwners(owners: Iterable<CircleMemberId>): this;
  excludeOwners(owners: Iterable<CircleMemberId>): this;
  includeMembers(members: Iterable<CircleMemberId>): this;
  excludeMembers(members: Iterable<CircleMemberId>): this;
  build(): ICircleSpecification;
}
