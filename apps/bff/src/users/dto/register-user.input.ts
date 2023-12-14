import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class RegisterUserInput {
  @Field()
  @IsNotEmpty()
  public readonly name: string;

  public constructor(name: string) {
    this.name = name;
  }
}
