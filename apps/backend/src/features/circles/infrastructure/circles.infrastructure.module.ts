import { Module } from '@nestjs/common';

import { CirclesPersistenceModule } from './persistences';

@Module({
  imports: [CirclesPersistenceModule],
  providers: [],
  exports: [CirclesPersistenceModule],
})
export class CirclesInfrastructureModule {}
