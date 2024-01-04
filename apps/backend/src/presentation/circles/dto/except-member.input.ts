import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ExceptMemberInput {
  @IsString()
  @ApiProperty({
    example: '1',
    description: 'The id of member to except circle',
  })
  public readonly memberId: string;

  @IsString()
  @ApiProperty({
    example: '1',
  })
  public readonly foo: string;

  public constructor(memberId: string) {
    this.memberId = memberId;
    this.foo = 'foo';
  }
}
