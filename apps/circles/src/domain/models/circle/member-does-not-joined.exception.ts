import { type MemberId } from '../member';
import { type CircleId } from './id';

export class MemberDoesNotJoinedException extends Error {
  public readonly circle: CircleId;

  public readonly member: MemberId;

  public constructor(circle: CircleId, member: MemberId) {
    super('Member does not joined');

    this.circle = circle;
    this.member = member;
  }
}
