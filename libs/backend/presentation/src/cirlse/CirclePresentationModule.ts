import { CircleModule } from '@itddd/backend-feature-circle';
import { UserModule } from '@itddd/backend-feature-user';
import { Module } from '@nestjs/common';

import { CircleResolver } from './CircleResolver';

@Module({
  imports: [CircleModule, UserModule],
  providers: [CircleResolver],
})
export class CirclePresentationModule {}
