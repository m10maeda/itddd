import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  public readonly id: string;

  @Field()
  public readonly name: string;

  public constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
