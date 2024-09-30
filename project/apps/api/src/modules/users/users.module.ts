import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [AuthenticationModule],
})
export class UsersModule {}
