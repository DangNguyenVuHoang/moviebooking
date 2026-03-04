import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async register(dto: { ho_ten: string; email: string; so_dt?: string; mat_khau: string }) {
    const hash = await bcrypt.hash(dto.mat_khau, 10);
    const user = await this.users.createUser({ ...dto, mat_khau: hash });

    const access_token = await this.jwt.signAsync({
      sub: user.tai_khoan,
      email: user.email,
      role: user.loai_nguoi_dung,
    });

    return { user, access_token };
  }

  async login(dto: { email: string; mat_khau: string }) {
    const user = await this.users.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Sai email hoặc mật khẩu');

    const ok = await bcrypt.compare(dto.mat_khau, user.mat_khau);
    if (!ok) throw new UnauthorizedException('Sai email hoặc mật khẩu');

    const access_token = await this.jwt.signAsync({
      sub: user.tai_khoan,
      email: user.email,
      role: user.loai_nguoi_dung,
    });

    return {
      user: { tai_khoan: user.tai_khoan, ho_ten: user.ho_ten, email: user.email, loai_nguoi_dung: user.loai_nguoi_dung },
      access_token,
    };
  }
}