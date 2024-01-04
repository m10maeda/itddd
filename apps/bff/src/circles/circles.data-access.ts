import { type Circle, type CircleList } from './models';
import { UserList } from '../users';

export type PageInfo = {
  page: number;
  size: number;
};

export type Criteria = {
  query?: string;
  includes?: string[];
  excludes?: string[];
};

export interface ICirclesDataAccess {
  getBy(id: string): Promise<Circle>;
  findAllBy(criteria?: Criteria, pageInfo?: PageInfo): Promise<CircleList>;
  create(name: string, ownerId: string): Promise<Circle>;
  delete(id: string): Promise<void>;
  update(id: string, name: string): Promise<Circle>;
  accept(id: string, memberId: string): Promise<Circle>;
  except(id: string, memberId: string): Promise<Circle>;
  getCandidates(id: string): Promise<UserList>;
}

export const CIRCLES_DATA_ACCESS = Symbol('CIRCLES_DATA_ACCESS');
