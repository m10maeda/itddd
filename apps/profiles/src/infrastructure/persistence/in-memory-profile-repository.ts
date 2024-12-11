import {
  IProfileRepository,
  Profile,
  ProfileId,
  ProfileName,
} from '../../domain/models';

export class InMemoryProfileRepository implements IProfileRepository {
  private readonly profiles: Map<string, Profile>;

  public async delete(profile: Profile): Promise<void> {
    this.profiles.delete(profile.id.toString());

    return Promise.resolve();
  }

  public async getAll(): Promise<Iterable<Profile>> {
    return Promise.resolve(
      Array.from(this.profiles.values()).map((profile) =>
        InMemoryProfileRepository.copy(profile),
      ),
    );
  }

  public async getBy(id: ProfileId): Promise<Profile | undefined>;
  public async getBy(name: ProfileName): Promise<Profile | undefined>;
  public async getBy(
    idOrName: ProfileId | ProfileName,
  ): Promise<Profile | undefined> {
    const profile =
      idOrName instanceof ProfileId
        ? this.profiles.get(idOrName.toString())
        : Array.from(this.profiles.values()).find((_profile) =>
            _profile.name.equals(idOrName),
          );

    if (profile === undefined) return Promise.resolve(undefined);

    return Promise.resolve(InMemoryProfileRepository.copy(profile));
  }

  public async save(profile: Profile): Promise<void> {
    this.profiles.set(profile.id.toString(), profile);

    return Promise.resolve();
  }

  public constructor(profiles: Iterable<Profile> = []) {
    this.profiles = new Map(
      Array.from(profiles).map((profile) => [profile.id.toString(), profile]),
    );
  }

  private static copy(profile: Profile): Profile {
    return new Profile(profile.id, profile.name);
  }
}
