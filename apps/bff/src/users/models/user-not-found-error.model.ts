import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User not found error' })
export class UserNotFoundError {
  @Field(() => ID)
  public readonly id: string;

  @Field()
  public readonly message: string;

  public constructor(id: string) {
    this.id = id;
    this.message = `User(id: "${id}") is not found.`;
  }
}
