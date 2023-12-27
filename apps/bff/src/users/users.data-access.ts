import { type User, type UserList } from './models';

export type PageInfo = {
  page: number;
  size: number;
};

export type Criteria = {
  query?: string;
  includes?: string[];
  excludes?: string[];
};

export interface IUsersDataAccess {
  getBy(id: string): Promise<User>;
  findAllBy(criteria?: Criteria, pageInfo?: PageInfo): Promise<UserList>;
  register(name: string): Promise<User>;
  delete(id: string): Promise<void>;
  update(id: string, name: string): Promise<User>;
}

export const USERS_DATA_ACCESS = Symbol('USERS_DATA_ACCESS');
