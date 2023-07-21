import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  public readonly name: string;

  public constructor(name: string) {
    this.name = name;
  }
}
