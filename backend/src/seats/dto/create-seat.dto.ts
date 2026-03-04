import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateSeatDto {
  @ApiProperty() @IsString() ten_ghe: string;
  @ApiProperty() @IsString() loai_ghe: string;
  @ApiProperty() @IsInt() ma_rap: number;
}