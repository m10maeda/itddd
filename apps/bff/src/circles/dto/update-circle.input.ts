import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateCircleInput {
  @Field(() => ID)
  @IsNotEmpty()
  public readonly id: string;

  @Field()
  @IsNotEmpty()
  public readonly name: string;

  public constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
