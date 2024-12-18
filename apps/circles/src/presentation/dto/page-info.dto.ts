import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PageInfoDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }: { value: string }) => Number.parseInt(value))
  @ApiPropertyOptional({ example: 1 })
  public readonly page: number = 1;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }: { value: string }) => Number.parseInt(value))
  @ApiPropertyOptional({ example: 10 })
  public readonly size: number = 20;

  public constructor(page = 1, size = 20) {
    this.page = page;
    this.size = size;
  }
}
