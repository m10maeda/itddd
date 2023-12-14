import { Field, ObjectType } from '@nestjs/graphql';

import { User } from './user.model';

@ObjectType({ description: 'User delete model' })
export class UserList {
  @Field(() => [User])
  public readonly results: User[];

  @Field()
  public readonly total: number;

  @Field()
  public readonly count: number;

  public constructor(users: User[], total: number) {
    this.results = users;
    this.total = total;
    this.count = users.length;
  }
}
