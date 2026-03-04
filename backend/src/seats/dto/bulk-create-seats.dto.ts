import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class BulkCreateSeatsDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  ma_rap: number;

  @ApiProperty({ example: ['A', 'B', 'C'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  rows: string[];

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(1)
  seatsPerRow: number;

  @ApiProperty({ required: false, example: 'Thuong' })
  @IsOptional()
  @IsString()
  loai_ghe?: string;
}