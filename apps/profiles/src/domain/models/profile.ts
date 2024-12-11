import { ProfileRenamed } from './event';
import { type ProfileId } from './profile-id';
import { type ProfileName } from './profile-name';

export class Profile {
  public readonly id: ProfileId;

  private _name: ProfileName;

  public get name(): ProfileName {
    return this._name;
  }

  public equals(other: Profile): boolean {
    return this.id.equals(other.id);
  }

  public renameTo(name: ProfileName): ProfileRenamed {
    const event = new ProfileRenamed(this.id, this.name, name);

    this._name = name;

    return event;
  }

  public toString(): string {
    return `ProfileName({id: '${this.id.toString()}', name: '${this._name.toString()}'}})`;
  }

  public constructor(id: ProfileId, name: ProfileName) {
    this.id = id;
    this._name = name;
  }
}
