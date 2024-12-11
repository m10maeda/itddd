import { Module, ValidationPipe, type Provider } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { ApplicationService } from './application';
import {
  type IProfileEventPublisher,
  type IProfileFactory,
  type IProfileRepository,
} from './domain/models';
import { ProfileExistenceService } from './domain/services';
import { ProfileEventBus } from './infrastructure/event-bus';
import {
  InfrastructureModule,
  PROFILE_FACTORY,
  PROFILE_REPOSITORY,
} from './infrastructure/infrastructure.module';
import { ProfileController } from './presentation';

@Module({
  controllers: [ProfileController],
  imports: [InfrastructureModule],
  providers: [
    {
      provide: ProfileExistenceService,
      useFactory: (repository: IProfileRepository) =>
        new ProfileExistenceService(repository),
      inject: [PROFILE_REPOSITORY],
    } satisfies Provider<ProfileExistenceService>,

    {
      provide: ApplicationService,
      useFactory: (
        eventPublisher: IProfileEventPublisher,
        repository: IProfileRepository,
        factory: IProfileFactory,
        service: ProfileExistenceService,
      ) => new ApplicationService(eventPublisher, repository, factory, service),
      inject: [
        ProfileEventBus,
        PROFILE_REPOSITORY,
        PROFILE_FACTORY,
        ProfileExistenceService,
      ],
    } satisfies Provider<ApplicationService>,

    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    } satisfies Provider<ValidationPipe>,
  ],
})
export class AppModule {}
