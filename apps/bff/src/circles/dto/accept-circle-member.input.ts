import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class AcceptCircleMemberInput {
  @Field(() => ID)
  @IsNotEmpty()
  public readonly id: string;

  @Field(() => ID)
  @IsNotEmpty()
  public readonly member: string;

  public constructor(id: string, member: string) {
    this.id = id;
    this.member = member;
  }
}
