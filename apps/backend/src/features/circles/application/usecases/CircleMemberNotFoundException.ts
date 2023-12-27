import { type CircleMemberId } from '../../domain';

export class CircleMemberNotFoundException extends Error {
  public readonly id: CircleMemberId;

  public constructor(id: CircleMemberId) {
    super(`CircleMember("id: ${id.toString()}") not found.`);

    this.id = id;
  }
}
