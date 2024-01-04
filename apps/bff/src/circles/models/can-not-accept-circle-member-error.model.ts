import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CanNotAcceptCircleMemberError extends Error {
  @Field(() => ID)
  public readonly id: string;

  @Field()
  public readonly message: string;

  public constructor(id: string, message: string) {
    super();

    this.id = id;
    this.message = message;
  }
}
