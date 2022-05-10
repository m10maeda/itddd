import { User } from './User';
import { UserName } from './UserName';

export interface IUserFactory {
  create(name: UserName): Promise<User>;
}
