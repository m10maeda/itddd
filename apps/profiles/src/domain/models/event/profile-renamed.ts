import { ProfileEvent } from './profile-event';
import { type ProfileId } from '../profile-id';
import { type ProfileName } from '../profile-name';

export class ProfileRenamed extends ProfileEvent {
  public readonly newName: ProfileName;

  public readonly oldName: ProfileName;

  public constructor(
    id: ProfileId,
    oldName: ProfileName,
    newName: ProfileName,
  ) {
    super(id);

    this.oldName = oldName;
    this.newName = newName;
  }
}
