import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateTheaterSystemDto {
  @ApiProperty() @IsString() ten_he_thong_rap: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() logo?: string;
}