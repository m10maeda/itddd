import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersFeatureModule } from '../../features/users';

@Module({
  imports: [UsersFeatureModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersPresentationModule {}
