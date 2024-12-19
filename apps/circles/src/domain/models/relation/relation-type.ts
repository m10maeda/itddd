enum _RelationType {
  Owner,
  Member,
}

export class RelationType {
  public static readonly Member = new RelationType(_RelationType.Member);

  public static readonly Owner = new RelationType(_RelationType.Owner);

  private readonly value: _RelationType;

  public equals(other: RelationType): boolean {
    return this.value === other.value;
  }

  public isOwner(): boolean {
    return this.value === _RelationType.Owner;
  }

  private constructor(value: _RelationType) {
    this.value = value;
  }
}
