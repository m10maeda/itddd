import { UserModule } from '@itddd/backend-feature-user';
import { Module } from '@nestjs/common';

import { UserResolver } from './UserResolver';

@Module({
  imports: [UserModule],
  providers: [UserResolver],
})
export class UserPresentationModule {}
