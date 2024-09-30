import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './public.decorator';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authenticationService.signIn(signInDto);
  }
}
