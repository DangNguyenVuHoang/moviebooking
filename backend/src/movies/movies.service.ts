import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.phim.findMany({
      orderBy: { ma_phim: 'desc' },
    });
  }

  async findOne(id: number) {
    const movie = await this.prisma.phim.findUnique({
      where: { ma_phim: id },
    });

    if (!movie) throw new NotFoundException('Không tìm thấy phim');
    return movie;
  }

  create(data: CreateMovieDto) {
    return this.prisma.phim.create({
      data: {
        ...data,
        ngay_khoi_chieu: data.ngay_khoi_chieu
          ? new Date(data.ngay_khoi_chieu)
          : undefined,
      },
    });
  }

  async update(id: number, data: UpdateMovieDto) {
    await this.findOne(id);

    return this.prisma.phim.update({
      where: { ma_phim: id },
      data: {
        ...data,
        ngay_khoi_chieu: data.ngay_khoi_chieu
          ? new Date(data.ngay_khoi_chieu)
          : undefined,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.phim.delete({
      where: { ma_phim: id },
    });
  }
}