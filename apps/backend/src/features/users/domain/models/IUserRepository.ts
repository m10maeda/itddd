import { User } from './User';
import { UserId } from './UserId';
import { UserName } from './UserName';

export interface IUserRepository {
  findBy(id: UserId): Promise<User | undefined>;
  findBy(name: UserName): Promise<User | undefined>;
  findAll(): Promise<Iterable<User>>;
  findAllBy(ids: Iterable<UserId>): Promise<Iterable<User>>;
  save(user: User): Promise<void>;
  delete(user: User): Promise<void>;
}
