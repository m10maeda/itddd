import { Profile } from './profile';
import { ProfileId } from './profile-id';
import { ProfileName } from './profile-name';

describe('Profile', () => {
  describe('equals method', () => {
    it('should return true when specified Profile have the same id', () => {
      const sut = new Profile(new ProfileId('0'), new ProfileName('Alice'));
      const target = new Profile(new ProfileId('0'), new ProfileName('Bob'));

      expect(sut.equals(target)).toBeTrue();
    });

    it('should return false when specified Profile have the different id', () => {
      const sut = new Profile(new ProfileId('0'), new ProfileName('Alice'));
      const target = new Profile(new ProfileId('1'), new ProfileName('Alice'));

      expect(sut.equals(target)).toBeFalse();
    });
  });

  describe('renameTo method', () => {
    it('should change to specified profile name', () => {
      const sut = new Profile(new ProfileId('0'), new ProfileName('Alice'));

      const newName = new ProfileName('Bob');

      expect(sut.name).not.toEqual(newName);

      sut.renameTo(newName);

      expect(sut.name).toEqual(newName);
    });
  });
});
