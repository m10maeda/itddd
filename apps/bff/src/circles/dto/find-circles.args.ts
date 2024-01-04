import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindCirclesArgs {
  @Field({ nullable: true })
  public readonly query?: string;

  public constructor(criteria?: { query?: string }) {
    this.query = criteria?.query;
  }
}
