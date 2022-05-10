import {
  IUserRepository,
  User,
  UserId,
  UserName,
  UserType,
} from '../../domain/models';

export class InMemoryUserRepository implements IUserRepository {
  public async findBy(id: UserId): Promise<User>;
  public async findBy(name: UserName): Promise<User>;
  public async findBy(value: UserId | UserName): Promise<User> {
    if (value instanceof UserId) {
      const user = this.users.get(value.toString());

      return Promise.resolve(this.clone(user));
    }

    const user = this.toArray().find((_user) => _user.name.equals(value));

    return Promise.resolve(this.clone(user));
  }

  public async findAllBy(ids: Iterable<UserId>): Promise<Iterable<User>> {
    const idArray = Array.from(ids);
    const users = this.toArray().filter((user) =>
      idArray.some((id) => id.equals(user.id)),
    );

    return Promise.resolve(users.map(this.clone));
  }

  public async findAll(): Promise<Iterable<User>> {
    return Promise.resolve(this.toArray().map(this.clone));
  }

  public async save(user: User): Promise<void> {
    this.users.set(user.id.toString(), user);

    return Promise.resolve();
  }

  public async delete(user: User): Promise<void> {
    this.users.delete(user.id.toString());

    return Promise.resolve();
  }

  public constructor(users: Iterable<User> = []) {
    this.users = new Map(
      Array.from(users).map((user) => [user.id.toString(), user]),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  private clone(user: User): User {
    if (user === undefined) return undefined;

    return new User(
      new UserId(user.id.toString()),
      new UserName(user.name.toString()),
      user.type === UserType.Premium ? UserType.Premium : UserType.Normal,
    );
  }

  private toArray(): User[] {
    return Array.from(this.users.values());
  }

  private readonly users: Map<ReturnType<UserId['toString']>, User>;
}
