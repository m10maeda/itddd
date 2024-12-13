import { ApiProperty } from '@nestjs/swagger';

export class Profile {
  @ApiProperty({
    example: '0',
    description: 'The id of the Profile',
  })
  public readonly id: string;

  @ApiProperty({
    example: 'Alice',
    description: 'The name of the Profile',
  })
  public readonly name: string;

  public constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
