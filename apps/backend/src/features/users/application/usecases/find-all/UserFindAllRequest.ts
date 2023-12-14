import { UserFindCriteria } from './UserFindCriteria';
import {
  PageInfo,
  UseCaseRequest,
} from '../../../../shared/application/usecase';

export class UserFindAllRequest extends UseCaseRequest {
  public readonly criteria: UserFindCriteria;

  public readonly pageInfo?: PageInfo;

  public constructor(criteria: UserFindCriteria, pageInfo?: PageInfo) {
    super();

    this.criteria = criteria;
    this.pageInfo = pageInfo;
  }
}
