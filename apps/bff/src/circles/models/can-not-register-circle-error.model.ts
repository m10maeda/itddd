import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CanNotRegisterCircleError extends Error {
  @Field()
  public readonly name: string;

  @Field()
  public readonly message: string;

  public constructor(name: string, message: string) {
    super();

    this.name = name;
    this.message = message;
  }
}
