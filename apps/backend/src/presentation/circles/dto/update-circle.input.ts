import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCircleInput {
  @IsString()
  @ApiProperty({
    example: 'Football',
    description: 'The name of Circle to update',
  })
  public readonly name: string;

  public constructor(name: string) {
    this.name = name;
  }
}
