import { UseCaseRequest } from '../../../../shared/application/usecase';

export class CircleAcceptMemberRequest extends UseCaseRequest {
  public readonly id: string;

  public readonly member: string;

  public constructor(id: string, member: string) {
    super();

    this.id = id;
    this.member = member;
  }
}
