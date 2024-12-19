import { type Member } from './member';
import { type MemberId } from './member-id';

export interface IMemberRepository {
  getAllBy(ids: Iterable<MemberId>): Promise<Iterable<Member>>;
  getBy(id: MemberId): Promise<Member | undefined>;
}
