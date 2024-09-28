import { User } from '~/db/types';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUsersRepository {
  create(createUserDto: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}
