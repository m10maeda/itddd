import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { CirclesPresentationModule } from './circles/circles.module';
import { UsersPresentationModule } from './users';

@Module({
  imports: [UsersPresentationModule, CirclesPresentationModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    },
  ],
})
export class PresentationModule {}
