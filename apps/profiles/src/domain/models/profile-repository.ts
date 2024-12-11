import { type Profile } from './profile';
import { type ProfileId } from './profile-id';
import { type ProfileName } from './profile-name';

export interface IProfileRepository {
  delete(profile: Profile): Promise<void>;
  getAll(): Promise<Iterable<Profile>>;
  getBy(id: ProfileId): Promise<Profile | undefined>;
  getBy(name: ProfileName): Promise<Profile | undefined>;
  save(profile: Profile): Promise<void>;
}
