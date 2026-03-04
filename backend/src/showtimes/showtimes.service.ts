import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';

@Injectable()
export class ShowtimesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.lichChieu.findMany({ orderBy: { ma_lich_chieu: 'desc' } });
  }

  async findOne(id: number) {
    const item = await this.prisma.lichChieu.findUnique({ where: { ma_lich_chieu: id } });
    if (!item) throw new NotFoundException('Không tìm thấy lịch chiếu');
    return item;
  }

  async create(dto: CreateShowtimeDto) {
    const rap = await this.prisma.rapPhim.findUnique({ where: { ma_rap: dto.ma_rap } });
    if (!rap) throw new BadRequestException('Rạp không tồn tại');

    const phim = await this.prisma.phim.findUnique({ where: { ma_phim: dto.ma_phim } });
    if (!phim) throw new BadRequestException('Phim không tồn tại');

    return this.prisma.lichChieu.create({
      data: {
        ma_rap: dto.ma_rap,
        ma_phim: dto.ma_phim,
        ngay_gio_chieu: new Date(dto.ngay_gio_chieu),
        gia_ve: dto.gia_ve,
      },
    });
  }

  remove(id: number) {
    return this.prisma.lichChieu.delete({ where: { ma_lich_chieu: id } });
  }
}