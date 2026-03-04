import { PartialType } from '@nestjs/swagger';
import { CreateTheaterSystemDto } from './create-theater-system.dto';

export class UpdateTheaterSystemDto extends PartialType(CreateTheaterSystemDto) {}