import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterProfileDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @ApiProperty({ example: 'Alice' })
  public readonly name: string;

  public constructor(name: string) {
    this.name = name;
  }
}
