import { type ProfileId } from '../profile-id';

export abstract class ProfileEvent {
  public readonly id: ProfileId;

  public constructor(id: ProfileId) {
    this.id = id;
  }
}
