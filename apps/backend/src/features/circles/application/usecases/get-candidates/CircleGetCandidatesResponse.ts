import { UseCaseResponse } from '../../../../shared/application/usecase';
import { CircleMemberId } from '../shared';

export class CircleGetCandidatesResponse extends UseCaseResponse {
  public readonly candidates: Iterable<CircleMemberId>;

  public constructor(candidates: Iterable<CircleMemberId>) {
    super();

    this.candidates = candidates;
  }
}
