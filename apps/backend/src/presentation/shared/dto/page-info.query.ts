import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsPositive, ValidateIf } from 'class-validator';

export class PageInfoQuery {
  @ValidateIf((self: PageInfoQuery) => self.size !== undefined)
  @IsInt()
  @IsPositive()
  @ApiPropertyOptional({
    example: 1,
    minimum: 1,
    description: 'The page of matches users',
  })
  public readonly page?: number;

  @ValidateIf((self: PageInfoQuery) => self.page !== undefined)
  @IsInt()
  @IsPositive()
  @ApiPropertyOptional({
    example: 10,
    minimum: 1,
    description: 'The page of matches users',
  })
  public readonly size?: number;

  public toJson():
    | {
        page: number;
        size: number;
      }
    | undefined {
    if (this.page && this.size)
      return {
        page: this.page,
        size: this.size,
      };

    return undefined;
  }

  public constructor(page?: number, size?: number) {
    this.page = page;
    this.size = size;
  }
}
