import { Role } from '@repo/authorization';
import { RegisterUserDto } from './register-user.dto';

export class CreateUserDto extends RegisterUserDto {
  role: Role;
}
