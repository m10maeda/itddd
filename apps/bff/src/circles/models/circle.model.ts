import { Field, ID, ObjectType } from '@nestjs/graphql';

import { User, UserResult } from '../../users/models';

@ObjectType({ description: 'user' })
export class Circle {
  @Field(() => ID)
  public readonly id: string;

  @Field()
  public readonly name: string;

  @Field(() => UserResult)
  public readonly owner: typeof UserResult;

  @Field(() => [User])
  public readonly members: User[];

  public constructor(
    id: string,
    name: string,
    owner: typeof UserResult,
    members: User[],
  ) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.members = members;
  }
}
