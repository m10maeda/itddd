import { Module, type Provider } from '@nestjs/common';

import { InMemoryProfileFactory } from './in-memory-profile-factory';
import { InMemoryProfileRepository } from './in-memory-profile-repository';
import {
  Profile,
  ProfileId,
  ProfileName,
  type IProfileFactory,
  type IProfileRepository,
} from '../../domain/models';

export const PROFILE_REPOSITORY = Symbol('PROFILE_REPOSITORY');
export const PROFILE_FACTORY = Symbol('PROFILE_FACTORY');

@Module({
  providers: [
    {
      provide: PROFILE_REPOSITORY,
      useFactory: () =>
        new InMemoryProfileRepository([
          new Profile(new ProfileId('0'), new ProfileName('Alice')),
          new Profile(new ProfileId('1'), new ProfileName('Bob')),
          new Profile(new ProfileId('2'), new ProfileName('Carol')),
          new Profile(new ProfileId('3'), new ProfileName('Dave')),
          new Profile(new ProfileId('4'), new ProfileName('Ellen')),
        ]),
    } satisfies Provider<IProfileRepository>,

    {
      provide: PROFILE_FACTORY,
      useFactory: () => new InMemoryProfileFactory(5),
    } satisfies Provider<IProfileFactory>,
  ],
  exports: [PROFILE_REPOSITORY, PROFILE_FACTORY],
})
export class PersistenceModule {}
