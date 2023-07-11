import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserInput {
  @IsString()
  @ApiProperty({ example: 'Alice' })
  public readonly name: string;

  public constructor(name: string) {
    this.name = name;
  }
}
