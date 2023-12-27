import { CircleFindCriteria } from './CircleFindCriteria';
import {
  PageInfo,
  UseCaseRequest,
} from '../../../../shared/application/usecase';

export class CircleFindAllRequest extends UseCaseRequest {
  public readonly criteria: CircleFindCriteria;

  public readonly pageInfo?: PageInfo;

  public constructor(criteria: CircleFindCriteria, pageInfo?: PageInfo) {
    super();

    this.criteria = criteria;
    this.pageInfo = pageInfo;
  }
}
