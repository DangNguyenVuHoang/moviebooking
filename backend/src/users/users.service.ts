import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.nguoiDung.findUnique({ where: { email } });
  }

  async createUser(data: {
    ho_ten: string;
    email: string;
    so_dt?: string;
    mat_khau: string;
    loai_nguoi_dung?: string;
  }) {
    const existed = await this.findByEmail(data.email);
    if (existed) throw new BadRequestException('Email đã tồn tại');

    return this.prisma.nguoiDung.create({
      data: {
        ho_ten: data.ho_ten,
        email: data.email,
        so_dt: data.so_dt,
        mat_khau: data.mat_khau,
        loai_nguoi_dung: data.loai_nguoi_dung ?? 'KhachHang',
      },
      select: { tai_khoan: true, ho_ten: true, email: true, so_dt: true, loai_nguoi_dung: true },
    });
  }
}