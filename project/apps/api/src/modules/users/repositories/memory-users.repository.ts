import { Injectable } from '@nestjs/common';
import { User } from '~/db/types';
import { CreateUserDto } from '../dto/create-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class MemoryUsersRepository {
  private users: User[] = [];

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = {
      id: randomUUID() as string,
      ...createUserDto,
      passwordLastChanged: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
