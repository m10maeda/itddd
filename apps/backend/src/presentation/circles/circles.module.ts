import { Module } from '@nestjs/common';

import { CirclesController } from './circles.controller';
import { CirclesService } from './circles.service';
import { CirclesFeatureModule } from '../../features/circles';
import { UsersPresentationModule } from '../users';

@Module({
  imports: [CirclesFeatureModule, UsersPresentationModule],
  controllers: [CirclesController],
  providers: [CirclesService],
  exports: [],
})
export class CirclesPresentationModule {}
