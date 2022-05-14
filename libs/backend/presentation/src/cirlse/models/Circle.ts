import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'circle' })
export class Circle {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => ID)
  public readonly id: string;

  @Field()
  public readonly name: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => ID)
  public readonly ownerId: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [ID])
  public readonly memberIds: string[];

  public constructor(
    id: string,
    name: string,
    ownerId: string,
    memberIds: string[],
  ) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.memberIds = memberIds;
  }
}
