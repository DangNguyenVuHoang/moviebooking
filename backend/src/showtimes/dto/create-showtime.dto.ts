import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt } from 'class-validator';

export class CreateShowtimeDto {
  @ApiProperty() @IsInt() ma_rap: number;
  @ApiProperty() @IsInt() ma_phim: number;
  @ApiProperty() @IsDateString() ngay_gio_chieu: string;
  @ApiProperty() @IsInt() gia_ve: number;
}