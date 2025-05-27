import { type MemberId } from '../member';
import { type CircleId } from './id';

export class MemberAlreadyAddedException extends Error {
  public readonly circle: CircleId;

  public readonly member: MemberId;

  public constructor(circle: CircleId, member: MemberId) {
    super('Member already added');

    this.circle = circle;
    this.member = member;
  }
}
