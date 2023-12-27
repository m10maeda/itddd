import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterCircleInput {
  @IsString()
  @ApiProperty({
    example: 'Baseball',
    description: 'The name of Circle to register',
  })
  public readonly name: string;

  @IsString()
  @ApiProperty({
    example: '1',
    description: 'The id of Circle owner',
  })
  public readonly owner: string;

  public constructor(name: string, owner: string) {
    this.name = name;
    this.owner = owner;
  }
}
