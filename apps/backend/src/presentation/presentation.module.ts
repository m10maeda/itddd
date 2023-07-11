import { Module } from '@nestjs/common';

import { UsersPresentationModule } from './users';

@Module({
  imports: [UsersPresentationModule],
})
export class PresentationModule {}
