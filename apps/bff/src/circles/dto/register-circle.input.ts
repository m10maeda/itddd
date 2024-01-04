import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class RegisterCircleInput {
  @Field()
  @IsNotEmpty()
  public readonly name: string;

  @Field(() => ID)
  @IsNotEmpty()
  public readonly owner: string;

  public constructor(name: string, owner: string) {
    this.name = name;
    this.owner = owner;
  }
}
