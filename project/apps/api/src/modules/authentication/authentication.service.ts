import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/repositories/users.repository';
import { SignInDto } from './dto/sign-in.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import bcrypt from 'bcrypt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInDto): Promise<SignInResponseDto> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayloadDto = { sub: user.id };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        expiresIn: '1d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
