import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class FindAllProfilesDto {
  @ApiPropertyOptional({ example: ['1', '3'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public readonly excludes: string[] = [];

  @ApiPropertyOptional({ example: ['0', '4'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public readonly includes: string[] = [];

  public constructor(includes = [], excludes = []) {
    this.includes = includes;
    this.excludes = excludes;
  }
}
