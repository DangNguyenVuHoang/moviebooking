import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  ten_phim: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  trailer?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  hinh_anh?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  mo_ta?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  ngay_khoi_chieu?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  danh_gia?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  hot?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  dang_chieu?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  sap_chieu?: boolean;
}