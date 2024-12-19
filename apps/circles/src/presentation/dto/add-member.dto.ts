import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddMemberDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '2' })
  public readonly id: string;

  public constructor(id: string) {
    this.id = id;
  }
}
