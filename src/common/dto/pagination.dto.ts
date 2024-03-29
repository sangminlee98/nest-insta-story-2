import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  @ApiProperty({
    example: 1,
  })
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @ApiProperty({
    example: 10,
  })
  limit: number = 10;
}
