import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateTheaterDto {
  @ApiProperty() @IsString() ten_rap: string;
  @ApiProperty() @IsInt() ma_cum_rap: number;
}