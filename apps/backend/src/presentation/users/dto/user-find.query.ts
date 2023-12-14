import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UserFindQuery {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Alice',
    description: 'The query of user name',
  })
  public readonly query?: string;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    example: ['0', '2'],
    description: 'The included of user id',
  })
  public readonly includes?: string[];

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    example: ['1'],
    description: 'The excluded of user id',
  })
  public readonly excludes?: string[];

  public constructor(query?: string, includes?: string[], excludes?: string[]) {
    this.query = query;
    this.includes = includes;
    this.excludes = excludes;
  }
}
