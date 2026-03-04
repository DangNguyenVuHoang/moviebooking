import { PartialType } from '@nestjs/swagger';
import { CreateTheaterComplexDto } from './create-theater-complex.dto';
export class UpdateTheaterComplexDto extends PartialType(CreateTheaterComplexDto) {}