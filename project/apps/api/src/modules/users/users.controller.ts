import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Public } from '../authentication/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto);
  }
}
