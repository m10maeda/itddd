import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class FindUsersArgs {
  @Field({ nullable: true })
  public readonly query?: string;

  @Field(() => [ID], { nullable: true })
  public readonly includes?: string[];

  @Field(() => [ID], { nullable: true })
  public readonly excludes?: string[];

  public constructor(criteria?: {
    query?: string;
    includes?: string[];
    excludes?: string[];
  }) {
    this.query = criteria?.query;
    this.includes = criteria?.includes;
    this.excludes = criteria?.excludes;
  }
}
