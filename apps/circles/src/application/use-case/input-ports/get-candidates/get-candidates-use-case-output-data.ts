import { type MemberData } from '../dto';
import { UseCaseOutputData } from '../use-case-output-data';

export class GetCandidatesUseCaseOutputData extends UseCaseOutputData {
  public readonly candidates: Iterable<MemberData>;

  public constructor(candidates: Iterable<MemberData>) {
    super();

    this.candidates = candidates;
  }
}
