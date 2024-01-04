import { Module } from '@nestjs/common';

import { CirclesResolver } from './circles.resolver';
import { DataAccessModule } from '../data-access/data-access.module';

@Module({
  imports: [DataAccessModule],
  providers: [CirclesResolver],
  exports: [],
})
export class CirclesModule {}
