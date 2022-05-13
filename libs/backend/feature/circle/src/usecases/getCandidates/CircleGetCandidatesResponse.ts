import { UseCaseResponse } from '@itddd/backend-feature-shared';
import { UserData } from '@itddd/backend-feature-user';

export class CircleGetCandidatesResponse extends UseCaseResponse {
  public readonly candidates: Iterable<UserData>;

  public constructor(candidates: Iterable<UserData>) {
    super();

    this.candidates = candidates;
  }
}
