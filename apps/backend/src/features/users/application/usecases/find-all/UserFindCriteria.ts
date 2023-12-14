export class UserFindCriteria {
  public readonly query?: string;

  public readonly includeIds?: string[];

  public readonly excludeIds?: string[];

  public constructor(criteria?: {
    query?: string;
    includeIds?: string[];
    excludeIds?: string[];
  }) {
    this.query = criteria?.query;
    this.includeIds = criteria?.includeIds;
    this.excludeIds = criteria?.excludeIds;
  }
}
