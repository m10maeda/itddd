enum Type {
  Normal = 'Normal',
  Premium = 'Premium',
}

export class UserType {
  public toString(): string {
    return this.type;
  }

  public equals(other: UserType): boolean {
    return this.type === other.type;
  }

  public isNormal(): boolean {
    return this.equals(UserType.Normal);
  }

  public isPremium(): boolean {
    return this.equals(UserType.Premium);
  }

  // eslint-disable-next-line class-methods-use-this
  public upgrade(): UserType {
    return UserType.Premium;
  }

  // eslint-disable-next-line class-methods-use-this
  public downgrade(): UserType {
    return UserType.Normal;
  }

  private readonly type: Type;

  private constructor(type: Type) {
    this.type = type;
  }

  public static readonly Normal: UserType = new UserType(Type.Normal);

  public static readonly Premium: UserType = new UserType(Type.Premium);
}
