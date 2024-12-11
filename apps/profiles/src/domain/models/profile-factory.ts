import { type Profile } from './profile';
import { type ProfileName } from './profile-name';

export interface IProfileFactory {
  create(name: ProfileName): Promise<Profile>;
}
