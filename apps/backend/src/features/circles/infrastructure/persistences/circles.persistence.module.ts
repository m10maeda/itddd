import { Module } from '@nestjs/common';

import { CircleMemberRepository } from './CircleMemberRepository';
import { InMemoryCircleFactory } from './InMemoryCircleFactory';
import { InMemoryCircleRepository } from './InMemoryCircleRepository';
import { InMemorySerialNumberAssigner } from '../../../shared/infrastructure';
import { UsersFeatureModule } from '../../../users';
import {
  Circle,
  CircleId,
  CircleName,
  CircleMembers,
  CircleMemberId,
} from '../../domain';

const mockCiecles = [
  new Circle(
    new CircleId('0'),
    new CircleName('Baseball'),
    new CircleMembers(new CircleMemberId('0'), [
      new CircleMemberId('1'),
      new CircleMemberId('3'),
    ]),
  ),
  new Circle(
    new CircleId('1'),
    new CircleName('Football'),
    new CircleMembers(new CircleMemberId('1'), [
      new CircleMemberId('2'),
      new CircleMemberId('3'),
    ]),
  ),
];

export const CIRCLE_REPOSITORY_TOKEN = Symbol('CIRCLE_REPOSITORY');
export const CIRCLE_FACTORY_TOKEN = Symbol('CIRCLE_FACTORY');
export const CIRCLE_MEMBER_REPOSITORY_TOKEN = Symbol(
  'CIRCLE_MEMBER_REPOSITORY',
);

@Module({
  imports: [UsersFeatureModule],
  providers: [
    {
      provide: CIRCLE_REPOSITORY_TOKEN,
      // TODO: Switch by environment
      useValue: new InMemoryCircleRepository(mockCiecles),
    },

    {
      provide: CIRCLE_FACTORY_TOKEN,
      // TODO: Switch by environment
      useValue: new InMemoryCircleFactory(
        new InMemorySerialNumberAssigner(mockCiecles.length),
      ),
    },

    {
      provide: CIRCLE_MEMBER_REPOSITORY_TOKEN,
      useClass: CircleMemberRepository,
    },
  ],
  exports: [
    CIRCLE_REPOSITORY_TOKEN,
    CIRCLE_FACTORY_TOKEN,
    CIRCLE_MEMBER_REPOSITORY_TOKEN,
  ],
})
export class CirclesPersistenceModule {}
