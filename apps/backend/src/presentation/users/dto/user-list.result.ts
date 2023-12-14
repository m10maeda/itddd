import { ApiProperty } from '@nestjs/swagger';

import { User, UserType } from '../entities';

export class UserListResult {
  @ApiProperty({
    type: [User],
    example: [
      { id: '0', name: 'Alice', type: UserType.Normal },
      { id: '1', name: 'Bob', type: UserType.Premium },
    ],
    description: 'The list of Users',
  })
  public readonly users: User[];

  @ApiProperty({
    example: 23,
    description: 'The total users count with specified',
  })
  public readonly total: number;

  @ApiProperty({
    example: 3,
    description: 'The matched users count with specified',
  })
  public readonly count: number;

  public constructor(users: User[], total: number) {
    this.users = users;
    this.total = total;
    this.count = users.length;
  }
}
