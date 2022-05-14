import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user' })
export class User {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => ID)
  public readonly id: string;

  @Field()
  public readonly name: string;

  public constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
