import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersRepository } from '../users/repositories/users.repository';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UsersRepository],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
