import { Module } from '@nestjs/common';

import { CirclePresentationModule } from './cirlse';
import { UserPresentationModule } from './user';

@Module({
  imports: [UserPresentationModule, CirclePresentationModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class PresentationModule {}
