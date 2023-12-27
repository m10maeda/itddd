export class CircleFindCriteria {
  public readonly query?: string;

  public readonly owners?: string[];

  public readonly members?: string[];

  public readonly excludeOwners?: string[];

  public readonly excludeMembers?: string[];

  public constructor(criteria?: {
    query?: string;
    owners?: string[];
    members?: string[];
    excludeOwners?: string[];
    excludeMembers?: string[];
  }) {
    this.query = criteria?.query;
    this.owners = criteria?.owners;
    this.members = criteria?.members;
    this.excludeOwners = criteria?.excludeOwners;
    this.excludeMembers = criteria?.excludeMembers;
  }
}
