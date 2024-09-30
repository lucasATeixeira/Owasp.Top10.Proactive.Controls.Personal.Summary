import { HttpException, Injectable } from '@nestjs/common';
import { validateIfPasswordIsStrong } from '@repo/utils';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersRepository } from './repositories/users.repository';
import bcrypt from 'bcrypt';
import { AuthenticationService } from '../authentication/authentication.service';
import { RegisterUserResponseDto } from './dto/register-user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authenticationService: AuthenticationService,
  ) {}

  async register(
    registerUserDto: RegisterUserDto,
  ): Promise<RegisterUserResponseDto> {
    const { email, password } = registerUserDto;

    const passwordIsStrong = validateIfPasswordIsStrong(password);

    if (!passwordIsStrong) {
      throw new HttpException(
        'Week password, your password must meet the following criteria: At least 8 characters in length, At least one uppercase letter (A-Z), At least one lowercase letter (a-z), At least one digit (0-9), At least one special character (@, $, !, %, *, ?, &)',
        400,
      );
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new HttpException('Email already in use', 400);
    }

    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync());

    const user = await this.usersRepository.create({
      ...registerUserDto,
      password: hashedPassword,
      role: 'USER',
    });

    const { accessToken, refreshToken } =
      await this.authenticationService.signIn({
        email: registerUserDto.email,
        password: registerUserDto.password,
      });

    // We do a copy of the user to avoid exposing the password and avoid removing
    // password from memory repository
    const userResponse = {
      ...user,
    };

    // @ts-expect-error this is a private field
    delete userResponse.password;

    return {
      accessToken,
      refreshToken,
      user: userResponse,
    };
  }
}
