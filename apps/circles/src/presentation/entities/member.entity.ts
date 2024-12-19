import { ApiProperty } from '@nestjs/swagger';

export class Member {
  @ApiProperty({
    example: '0',
    description: 'The id of the Member',
  })
  public readonly id: string;

  public constructor(id: string) {
    this.id = id;
  }
}
