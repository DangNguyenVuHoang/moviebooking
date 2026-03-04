import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { BulkCreateSeatsDto } from './dto/bulk-create-seats.dto';

@ApiTags('Seats')
@Controller('seats')
export class SeatsController {
  constructor(private readonly service: SeatsService) {}

  @Get()
  findAll(@Query('ma_rap') maRap?: string) {
    if (maRap) return this.service.findByTheater(Number(maRap));
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateSeatDto) {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSeatDto) {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  // ✅ endpoint tạo nhanh ghế
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('bulk')
  bulkCreate(@Body() dto: BulkCreateSeatsDto) {
    return this.service.bulkCreate(dto);
  }
}