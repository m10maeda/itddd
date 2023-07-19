import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum UserType {
  Normal = 'Normal',
  Premium = 'Premium',
}

registerEnumType(UserType, {
  name: 'UserType',
});

@ObjectType({ description: 'user' })
export class User {
  @Field(() => ID)
  public readonly id: string;

  @Field()
  public readonly name: string;

  @Field(() => UserType)
  public readonly type: UserType;

  public constructor(id: string, name: string, type: UserType) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}
