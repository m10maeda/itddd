import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AcceptMemberInput {
  @IsString()
  @ApiProperty({
    example: '1',
    description: 'The id of member to accept circle',
  })
  public readonly memberId: string;

  public constructor(memberId: string) {
    this.memberId = memberId;
  }
}
