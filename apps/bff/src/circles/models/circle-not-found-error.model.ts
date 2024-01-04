import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Circle not found error' })
export class CircleNotFoundError extends Error {
  @Field(() => ID)
  public readonly id: string;

  @Field()
  public readonly message: string;

  public constructor(id: string) {
    super();

    this.id = id;
    this.message = `Circle(id: "${id}") is not found.`;
  }
}
