import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CircleFindQuery {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Baseball',
    description: 'The query of circle name',
  })
  public readonly query?: string;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    example: ['0', '2'],
    description: 'The included of circle owner id',
  })
  public readonly owners?: string[];

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    example: ['0', '2'],
    description: 'The included of circle member id',
  })
  public readonly members?: string[];

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    example: ['1'],
    description: 'The excluded of circle owner id',
  })
  public readonly excludeOwners?: string[];

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    example: ['1'],
    description: 'The excluded of circle member id',
  })
  public readonly excludeMembers?: string[];

  public constructor(
    query?: string,
    owners?: string[],
    members?: string[],
    excludeOwners?: string[],
    excludeMembers?: string[],
  ) {
    this.query = query;
    this.owners = owners;
    this.members = members;
    this.excludeOwners = excludeOwners;
    this.excludeMembers = excludeMembers;
  }
}
