import { Field, ObjectType } from '@nestjs/graphql';

import { Circle } from './circle.model';

@ObjectType({ description: 'User delete model' })
export class CircleList {
  @Field(() => [Circle])
  public readonly results: Circle[];

  @Field()
  public readonly total: number;

  @Field()
  public readonly count: number;

  public constructor(circles: Circle[], total: number) {
    this.results = circles;
    this.total = total;
    this.count = circles.length;
  }
}
