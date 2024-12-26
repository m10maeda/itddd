import { ApiProperty } from '@nestjs/swagger';

import { CircleData } from '../../application/use-case/input-ports';

export class Circle {
  @ApiProperty({
    example: '0',
    description: 'The id of the Circle',
  })
  public readonly id: string;

  @ApiProperty({
    example: ['1', '3'],
    description: 'The ids of the circle members',
  })
  public readonly members: string[];

  @ApiProperty({
    example: 'Baseball',
    description: 'The name of the Circle',
  })
  public readonly name: string;

  @ApiProperty({
    example: '0',
    description: 'The id of the circle owner',
  })
  public readonly owner: string;

  public constructor(
    id: string,
    name: string,
    owner: string,
    members: string[],
  ) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.members = members;
  }

  public static create(circle: CircleData): Circle {
    return new Circle(
      circle.id,
      circle.name,
      circle.owner,
      Array.from(circle.members),
    );
  }
}
