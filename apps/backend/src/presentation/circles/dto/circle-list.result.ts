import { ApiProperty } from '@nestjs/swagger';

import { Circle } from '../entities';

export class CircleListResult {
  @ApiProperty({
    type: [Circle],
    example: [
      { id: '0', name: 'Baseball', owner: '2' },
      { id: '1', name: 'Football', owner: '1' },
    ],
    description: 'The list of Circles',
  })
  public readonly circles: Circle[];

  @ApiProperty({
    example: 23,
    description: 'The total users count with specified',
  })
  public readonly total: number;

  @ApiProperty({
    example: 3,
    description: 'The matched users count with specified',
  })
  public readonly count: number;

  public constructor(circles: Circle[], total: number) {
    this.circles = circles;
    this.total = total;
    this.count = circles.length;
  }
}
