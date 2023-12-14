import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@ArgsType()
export class PageInfoArgs {
  @IsInt()
  @IsPositive()
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  public readonly page: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  public readonly size: number;

  public constructor(page = 1, size = 10) {
    this.page = page;
    this.size = size;
  }
}
