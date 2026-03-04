import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { BulkCreateSeatsDto } from './dto/bulk-create-seats.dto';

@Injectable()
export class SeatsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.ghe.findMany({ orderBy: { ma_ghe: 'desc' } });
  }

  findByTheater(ma_rap: number) {
    return this.prisma.ghe.findMany({ where: { ma_rap }, orderBy: { ma_ghe: 'asc' } });
  }

  async findOne(id: number) {
    const item = await this.prisma.ghe.findUnique({ where: { ma_ghe: id } });
    if (!item) throw new NotFoundException('Không tìm thấy ghế');
    return item;
  }

  async create(dto: CreateSeatDto) {
    const theater = await this.prisma.rapPhim.findUnique({ where: { ma_rap: dto.ma_rap } });
    if (!theater) throw new BadRequestException('Rạp không tồn tại');

    return this.prisma.ghe.create({ data: dto });
  }

  async update(id: number, dto: UpdateSeatDto) {
    await this.findOne(id);

    if (dto.ma_rap) {
      const theater = await this.prisma.rapPhim.findUnique({ where: { ma_rap: dto.ma_rap } });
      if (!theater) throw new BadRequestException('Rạp không tồn tại');
    }

    return this.prisma.ghe.update({ where: { ma_ghe: id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.ghe.delete({ where: { ma_ghe: id } });
  }

  // ✅ BULK CREATE: tạo A1..A10, B1..B10...
  async bulkCreate(dto: BulkCreateSeatsDto) {
    const theater = await this.prisma.rapPhim.findUnique({ where: { ma_rap: dto.ma_rap } });
    if (!theater) throw new BadRequestException('Rạp không tồn tại');

    const loai = dto.loai_ghe ?? 'Thuong';

    const data = dto.rows.flatMap((row) =>
      Array.from({ length: dto.seatsPerRow }, (_, i) => ({
        ma_rap: dto.ma_rap,
        loai_ghe: loai,
        ten_ghe: `${row}${i + 1}`,
      })),
    );

    // createMany + skipDuplicates để chạy lại không chết vì trùng ghế
    const created = await this.prisma.ghe.createMany({
      data,
      skipDuplicates: true,
    });

    return {
      message: 'Bulk create seats done',
      createdCount: created.count,
      totalRequested: data.length,
    };
  }
}