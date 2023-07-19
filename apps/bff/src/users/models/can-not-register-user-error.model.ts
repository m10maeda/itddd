import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CanNotRegisterUserError {
  @Field()
  public readonly name: string;

  @Field()
  public readonly message: string;

  public constructor(name: string, message: string) {
    this.name = name;
    this.message = message;
  }
}
