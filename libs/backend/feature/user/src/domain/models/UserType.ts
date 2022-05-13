enum Type {
  Normal,
  Premiam,
}

export class UserType {
  private readonly value: Type;

  public equals(other: UserType): boolean {
    return this.value === other.value;
  }

  // eslint-disable-next-line class-methods-use-this
  public upgrade(): UserType {
    return UserType.Premium;
  }

  // eslint-disable-next-line class-methods-use-this
  public downgrade(): UserType {
    return UserType.Normal;
  }

  private constructor(value: Type) {
    this.value = value;
  }

  public static readonly Normal = new UserType(Type.Normal);

  public static readonly Premium = new UserType(Type.Premiam);
}
