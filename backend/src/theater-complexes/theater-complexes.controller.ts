import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TheaterComplexesService } from './theater-complexes.service';
import { CreateTheaterComplexDto } from './dto/create-theater-complex.dto';
import { UpdateTheaterComplexDto } from './dto/update-theater-complex.dto';

@ApiTags('TheaterComplexes')
@Controller('theater-complexes')
export class TheaterComplexesController {
  constructor(private readonly service: TheaterComplexesService) {}

  @Get()
  findAll(@Query('ma_he_thong_rap') maHeThongRap?: string) {
    if (maHeThongRap) return this.service.findBySystem(Number(maHeThongRap));
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateTheaterComplexDto) {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTheaterComplexDto) {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}