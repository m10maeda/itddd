import { UseCaseRequest } from '@itddd/backend-feature-shared';

export class CircleLeaveRequest extends UseCaseRequest {
  public readonly circleId: string;

  public readonly memberId: string;

  public constructor(circleId: string, memberId: string) {
    super();

    this.circleId = circleId;
    this.memberId = memberId;
  }
}
