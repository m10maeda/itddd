import { ProfileEvent } from './profile-event';
import { type ProfileId } from '../profile-id';
import { type ProfileName } from '../profile-name';

export class ProfileRegistered extends ProfileEvent {
  public readonly name: ProfileName;

  public constructor(id: ProfileId, name: ProfileName) {
    super(id);

    this.name = name;
  }
}
