import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Can not register cirlce error' })
export class CanNotRegisterCircleError {
  @Field()
  public readonly name: string | null;

  @Field()
  public readonly message: string;

  public constructor(name: string, message: string) {
    this.name = name;
    this.message = message;
  }
}
