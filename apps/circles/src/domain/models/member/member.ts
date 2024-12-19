import { type MemberId } from './member-id';

export class Member {
  public readonly id: MemberId;

  public equals(other: Member): boolean {
    return this.id.equals(other.id);
  }

  public constructor(id: MemberId) {
    this.id = id;
  }
}
