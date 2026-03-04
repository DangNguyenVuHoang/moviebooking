import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  // xem ghế đã đặt của 1 lịch chiếu
  async getBookedSeats(ma_lich_chieu: number) {
    const rows = await this.prisma.datVe.findMany({
      where: { ma_lich_chieu },
      select: { ma_ghe: true },
    });
    return rows.map((r) => r.ma_ghe);
  }

  async bookSeats(payload: { tai_khoan: number; ma_lich_chieu: number; ma_ghe_list: number[] }) {
    // 1) check lịch chiếu tồn tại
    const lc = await this.prisma.lichChieu.findUnique({ where: { ma_lich_chieu: payload.ma_lich_chieu } });
    if (!lc) throw new BadRequestException('Lịch chiếu không tồn tại');

    // 2) check ghế thuộc đúng rạp của lịch chiếu
    const seats = await this.prisma.ghe.findMany({
      where: { ma_ghe: { in: payload.ma_ghe_list } },
      select: { ma_ghe: true, ma_rap: true },
    });

    if (seats.length !== payload.ma_ghe_list.length) {
      throw new BadRequestException('Có ghế không tồn tại');
    }

    const invalid = seats.some((s) => s.ma_rap !== lc.ma_rap);
    if (invalid) throw new BadRequestException('Có ghế không thuộc rạp của lịch chiếu');

    // 3) transaction: check đã đặt + createMany
    try {
      return await this.prisma.$transaction(async (tx) => {
        const existed = await tx.datVe.findMany({
          where: {
            ma_lich_chieu: payload.ma_lich_chieu,
            ma_ghe: { in: payload.ma_ghe_list },
          },
          select: { ma_ghe: true },
        });

        if (existed.length > 0) {
          throw new BadRequestException(`Ghế đã được đặt: ${existed.map((e) => e.ma_ghe).join(', ')}`);
        }

        const created = await tx.datVe.createMany({
          data: payload.ma_ghe_list.map((ma_ghe) => ({
            tai_khoan: payload.tai_khoan,
            ma_lich_chieu: payload.ma_lich_chieu,
            ma_ghe,
          })),
        });

        return { message: 'Đặt vé thành công', createdCount: created.count };
      });
    } catch (e: any) {
      // Prisma unique constraint @@unique([ma_lich_chieu, ma_ghe]) cũng sẽ chặn race condition
      if (e?.code === 'P2002') {
        throw new BadRequestException('Một hoặc nhiều ghế đã được đặt trước đó');
      }
      throw e;
    }
  }
}