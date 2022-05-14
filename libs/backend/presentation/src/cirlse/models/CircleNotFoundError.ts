import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Circle not found error' })
export class CircleNotFoundError {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => ID)
  public readonly id: string;

  @Field()
  public readonly message: string;

  public constructor(id: string, message: string) {
    this.id = id;
    this.message = message;
  }
}
