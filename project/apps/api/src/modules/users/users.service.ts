import { HttpException, Injectable } from '@nestjs/common';
import { validateIfPasswordIsStrong } from '@repo/utils';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from '~/db/types';
import { UsersRepository } from './repositories/users.repository';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
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

    // @ts-expect-error this is a private field
    delete user.password;

    return user;
  }
}
