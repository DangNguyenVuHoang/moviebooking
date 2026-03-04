import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTheaterSystemDto } from './dto/create-theater-system.dto';
import { UpdateTheaterSystemDto } from './dto/update-theater-system.dto';

@Injectable()
export class TheaterSystemsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.heThongRap.findMany({ orderBy: { ma_he_thong_rap: 'desc' } });
  }

  async findOne(id: number) {
    const item = await this.prisma.heThongRap.findUnique({ where: { ma_he_thong_rap: id } });
    if (!item) throw new NotFoundException('Không tìm thấy hệ thống rạp');
    return item;
  }

  create(dto: CreateTheaterSystemDto) {
    return this.prisma.heThongRap.create({ data: dto });
  }

  async update(id: number, dto: UpdateTheaterSystemDto) {
    await this.findOne(id);
    return this.prisma.heThongRap.update({ where: { ma_he_thong_rap: id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.heThongRap.delete({ where: { ma_he_thong_rap: id } });
  }
}