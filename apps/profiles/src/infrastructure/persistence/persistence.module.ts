import { Module, type Provider } from '@nestjs/common';

import { InMemoryProfileFactory } from './in-memory-profile-factory';
import { InMemoryProfileRepository } from './in-memory-profile-repository';
import {
  type IProfileFactory,
  type IProfileRepository,
} from '../../domain/models';

export const PROFILE_REPOSITORY = Symbol('PROFILE_REPOSITORY');
export const PROFILE_FACTORY = Symbol('PROFILE_FACTORY');

@Module({
  providers: [
    {
      provide: PROFILE_REPOSITORY,
      useFactory: () => new InMemoryProfileRepository(),
    } satisfies Provider<IProfileRepository>,

    {
      provide: PROFILE_FACTORY,
      useFactory: () => new InMemoryProfileFactory(),
    } satisfies Provider<IProfileFactory>,
  ],
  exports: [PROFILE_REPOSITORY, PROFILE_FACTORY],
})
export class PersistenceModule {}
