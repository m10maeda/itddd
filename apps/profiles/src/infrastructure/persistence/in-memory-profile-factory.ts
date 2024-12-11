import {
  IProfileFactory,
  Profile,
  ProfileId,
  type ProfileName,
} from '../../domain/models';

export class InMemoryProfileFactory implements IProfileFactory {
  private serialNumber: number;

  public async create(name: ProfileName): Promise<Profile> {
    const id = new ProfileId(this.serialNumber.toString());
    const profile = new Profile(id, name);

    this.serialNumber += 1;

    return Promise.resolve(profile);
  }

  public constructor(initialSerialNumber = 0) {
    this.serialNumber = initialSerialNumber;
  }
}
