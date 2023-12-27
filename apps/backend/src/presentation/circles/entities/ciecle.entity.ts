import { ApiProperty } from '@nestjs/swagger';

export class Circle {
  @ApiProperty({ example: '1', description: 'The id of the Circle' })
  public readonly id: string;

  @ApiProperty({ example: 'Baseball', description: 'The name of the Circle' })
  public readonly name: string;

  @ApiProperty({ example: '1', description: 'The id of the Circle owner' })
  public readonly owner: string;

  public constructor(id: string, name: string, owner: string) {
    this.id = id;
    this.name = name;
    this.owner = owner;
  }
}
