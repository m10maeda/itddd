import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
  @Field()
  public readonly name: string;

  public constructor(name: string) {
    this.name = name;
  }
}
