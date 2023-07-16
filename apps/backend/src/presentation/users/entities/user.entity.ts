import { ApiProperty } from '@nestjs/swagger';

export enum UserType {
  Premium = 'Premium',
  Normal = 'Normal',
}

export class User {
  @ApiProperty({ example: '1' })
  public readonly id: string;

  @ApiProperty({ example: 'Alice' })
  public readonly name: string;

  @ApiProperty({ example: UserType.Normal, enum: UserType })
  public readonly type: UserType;

  public constructor(id: string, name: string, type: UserType) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}
