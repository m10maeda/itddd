import { ApiProperty } from '@nestjs/swagger';

export enum UserType {
  Premium = 'Premium',
  Normal = 'Normal',
}

export class User {
  @ApiProperty({ example: '1', description: 'The id of the User' })
  public readonly id: string;

  @ApiProperty({ example: 'Alice', description: 'The name of the User' })
  public readonly name: string;

  @ApiProperty({
    example: UserType.Normal,
    enum: UserType,
    description: 'The type of the User',
  })
  public readonly type: UserType;

  public constructor(id: string, name: string, type: UserType) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}
