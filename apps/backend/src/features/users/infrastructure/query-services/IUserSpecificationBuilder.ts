import { IUserSpecification, UserId } from '../../domain';

export interface IUserSpecificationBuilder {
  query(query: string): this;
  include(ids: UserId[]): this;
  exclude(ids: UserId[]): this;
  build(): IUserSpecification;
}
