import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PresentationModule, ProbremDetailFilter } from './presentation';

@Module({
  imports: [PresentationModule],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_FILTER,
      useClass: ProbremDetailFilter,
    },
  ],
})
export class AppModule {}
