import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterUserInput {
  @IsString()
  @ApiProperty({
    example: 'Alice',
    description: 'The name of User to register',
  })
  public readonly name: string;

  public constructor(name: string) {
    this.name = name;
  }
}
