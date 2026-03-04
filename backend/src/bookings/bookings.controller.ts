import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookingsService } from './bookings.service';
import { BookSeatsDto } from './dto/book-seats.dto';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  @Get('showtimes/:ma_lich_chieu/booked-seats')
  getBooked(@Param('ma_lich_chieu', ParseIntPipe) ma_lich_chieu: number) {
    return this.service.getBookedSeats(ma_lich_chieu);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('book')
  book(@Req() req: any, @Body() dto: BookSeatsDto) {
    const tai_khoan = req.user.sub;
    return this.service.bookSeats({
      tai_khoan,
      ma_lich_chieu: dto.ma_lich_chieu,
      ma_ghe_list: dto.ma_ghe_list,
    });
  }
}