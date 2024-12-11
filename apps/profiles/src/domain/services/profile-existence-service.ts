import { type IProfileRepository, type Profile } from '../models';

export class ProfileExistenceService {
  private readonly repository: IProfileRepository;

  public async exists(profile: Profile): Promise<boolean> {
    const duplicatedProfile = await this.repository.getBy(profile.name);

    return duplicatedProfile !== undefined;
  }

  public constructor(repository: IProfileRepository) {
    this.repository = repository;
  }
}
