import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterCircleDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @ApiProperty({ example: 'Baseball' })
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  public readonly owner: string;

  public constructor(name: string, owner: string) {
    this.name = name;
    this.owner = owner;
  }
}
