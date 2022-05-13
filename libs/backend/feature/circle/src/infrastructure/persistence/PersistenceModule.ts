import { InMemorySerialNumberAssigner } from '@itddd/backend-feature-shared';
import { UserId } from '@itddd/backend-feature-user';
import { Module } from '@nestjs/common';

import { Circle, CircleId, CircleName, Members } from '../../domain/models';
import { InMemoryCircleFactory } from './InMemoryCircleFactory';
import { InMemoryCircleRepository } from './InMemoryCircleRepository';

const mockCircles = [
  new Circle(
    new CircleId('0'),
    new CircleName('Baseball'),
    new UserId('0'),
    new Members([new UserId('1'), new UserId('3')]),
  ),
  new Circle(
    new CircleId('1'),
    new CircleName('Football'),
    new UserId('2'),
    new Members([new UserId('0'), new UserId('3')]),
  ),
];

@Module({
  imports: [],
  providers: [
    {
      provide: 'ICircleRepository',
      // TODO: Switch by environment
      useValue: new InMemoryCircleRepository(mockCircles),
    },
    {
      provide: 'ICircleFactory',
      // TODO: Switch by environment
      useValue: new InMemoryCircleFactory(
        new InMemorySerialNumberAssigner(mockCircles.length),
      ),
    },
  ],
  exports: ['ICircleRepository', 'ICircleFactory'],
})
export class PersistenceModule {}
