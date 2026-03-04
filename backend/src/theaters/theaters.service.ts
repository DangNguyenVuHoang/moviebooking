import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';

@Injectable()
export class TheatersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.rapPhim.findMany({ orderBy: { ma_rap: 'desc' } });
  }

  findByComplex(ma_cum_rap: number) {
    return this.prisma.rapPhim.findMany({ where: { ma_cum_rap }, orderBy: { ma_rap: 'desc' } });
  }

  async findOne(id: number) {
    const item = await this.prisma.rapPhim.findUnique({ where: { ma_rap: id } });
    if (!item) throw new NotFoundException('Không tìm thấy rạp');
    return item;
  }

  async create(dto: CreateTheaterDto) {
    const complex = await this.prisma.cumRap.findUnique({ where: { ma_cum_rap: dto.ma_cum_rap } });
    if (!complex) throw new BadRequestException('Cụm rạp không tồn tại');
    return this.prisma.rapPhim.create({ data: dto });
  }

  async update(id: number, dto: UpdateTheaterDto) {
    await this.findOne(id);
    if (dto.ma_cum_rap) {
      const complex = await this.prisma.cumRap.findUnique({ where: { ma_cum_rap: dto.ma_cum_rap } });
      if (!complex) throw new BadRequestException('Cụm rạp không tồn tại');
    }
    return this.prisma.rapPhim.update({ where: { ma_rap: id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.rapPhim.delete({ where: { ma_rap: id } });
  }
}