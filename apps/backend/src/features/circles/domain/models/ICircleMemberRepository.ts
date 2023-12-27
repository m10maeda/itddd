import { type CircleId } from './circle';
import {
  type ICircleMemberSpecification,
  type CircleMember,
  type CircleMemberId,
} from './member';

export interface ICircleMemberRepository {
  findBy(id: CircleMemberId): Promise<CircleMember | undefined>;
  findAllBy(circleId: CircleId): Promise<Iterable<CircleMember>>;
  findAllBy(
    criteria: ICircleMemberSpecification,
  ): Promise<Iterable<CircleMember>>;
}
