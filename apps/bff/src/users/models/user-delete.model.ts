import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User delete model' })
export class UserDelete {
  @Field(() => ID)
  public readonly id: string;

  @Field()
  public readonly result: boolean;

  public constructor(id: string, result: boolean) {
    this.id = id;
    this.result = result;
  }
}
