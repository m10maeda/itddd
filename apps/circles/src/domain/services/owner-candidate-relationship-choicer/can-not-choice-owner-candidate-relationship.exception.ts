import { CircleId } from '../../models/circle';

export class CanNotChoiceOwnerCandidateRelationshipException extends Error {
  public readonly circleId: CircleId;

  public constructor(circleId: CircleId) {
    super(`No members circle ${circleId.toString()}`);

    this.circleId = circleId;
  }
}
