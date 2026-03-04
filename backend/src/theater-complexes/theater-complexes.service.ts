import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTheaterComplexDto } from './dto/create-theater-complex.dto';
import { UpdateTheaterComplexDto } from './dto/update-theater-complex.dto';

@Injectable()
export class TheaterComplexesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.cumRap.findMany({ orderBy: { ma_cum_rap: 'desc' } });
  }

  findBySystem(ma_he_thong_rap: number) {
    return this.prisma.cumRap.findMany({
      where: { ma_he_thong_rap },
      orderBy: { ma_cum_rap: 'desc' },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.cumRap.findUnique({ where: { ma_cum_rap: id } });
    if (!item) throw new NotFoundException('Không tìm thấy cụm rạp');
    return item;
  }

  async create(dto: CreateTheaterComplexDto) {
    // check foreign key exists
    const system = await this.prisma.heThongRap.findUnique({ where: { ma_he_thong_rap: dto.ma_he_thong_rap } });
    if (!system) throw new BadRequestException('Hệ thống rạp không tồn tại');

    return this.prisma.cumRap.create({ data: dto });
  }

  async update(id: number, dto: UpdateTheaterComplexDto) {
    await this.findOne(id);
    if (dto.ma_he_thong_rap) {
      const system = await this.prisma.heThongRap.findUnique({ where: { ma_he_thong_rap: dto.ma_he_thong_rap } });
      if (!system) throw new BadRequestException('Hệ thống rạp không tồn tại');
    }
    return this.prisma.cumRap.update({ where: { ma_cum_rap: id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.cumRap.delete({ where: { ma_cum_rap: id } });
  }
}