import { IUserRepository, User, UserId, UserName } from '../../domain';

export class InMemoryUserRepository implements IUserRepository {
  public async findBy(id: UserId): Promise<User | undefined>;
  public async findBy(name: UserName): Promise<User | undefined>;
  public async findBy(value: UserId | UserName): Promise<User | undefined> {
    const user =
      value instanceof UserId
        ? this.users.get(value.toString())
        : this.toArray().find((_user) => _user.name.equals(value));

    if (user === undefined) return Promise.resolve(undefined);

    return Promise.resolve(this.clone(user));
  }

  public async findAllBy(ids: Iterable<UserId>): Promise<Iterable<User>> {
    const idArray = Array.from(ids);
    const users = this.toArray().filter((user) =>
      idArray.some((id) => id.equals(user.id)),
    );

    return Promise.resolve(users.map((user) => this.clone(user)));
  }

  public async findAll(): Promise<Iterable<User>> {
    return Promise.resolve(this.toArray().map((user) => this.clone(user)));
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

  private readonly users: Map<ReturnType<UserId['toString']>, User>;

  // eslint-disable-next-line class-methods-use-this
  private clone(user: User): User {
    return new User(
      new UserId(user.id.toString()),
      new UserName(user.name.toString()),
      user.type,
    );
  }

  private toArray(): readonly User[] {
    return Array.from(this.users.values());
  }
}
