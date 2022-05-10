import { User } from './User';
import { UserId } from './UserId';
import { UserName } from './UserName';

export interface IUserRepository {
  findBy(id: UserId): Promise<User>;
  findBy(name: UserName): Promise<User>;
  findAllBy(ids: Iterable<UserId>): Promise<Iterable<User>>;
  findAll(): Promise<Iterable<User>>;
  save(user: User): Promise<void>;
  delete(user: User): Promise<void>;
}
