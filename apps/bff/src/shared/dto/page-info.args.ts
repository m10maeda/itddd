import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PageInfoArgs {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  public readonly page: number;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  public readonly size: number;

  public constructor(page = 1, size = 10) {
    this.page = page;
    this.size = size;
  }
}
