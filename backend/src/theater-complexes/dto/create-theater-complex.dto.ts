import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateTheaterComplexDto {
  @ApiProperty() @IsString() ten_cum_rap: string;
  @ApiProperty() @IsString() dia_chi: string;
  @ApiProperty() @IsInt() ma_he_thong_rap: number;
}