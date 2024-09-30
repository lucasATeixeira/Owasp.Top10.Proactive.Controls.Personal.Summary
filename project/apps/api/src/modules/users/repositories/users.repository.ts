import { Injectable } from '@nestjs/common';
import { IUsersRepository } from './iusers.repository';
import { db } from '~/db';
import { User } from '~/db/types';
import { CreateUserDto } from '../dto/create-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersRepository implements IUsersRepository {
  async create(createUserDto: CreateUserDto): Promise<User> {
    return db
      .insertInto('User')
      .values({
        id: randomUUID() as string,
        ...createUserDto,
        passwordLastChanged: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findById(id: string): Promise<User | undefined> {
    return db
      .selectFrom('User')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return db
      .selectFrom('User')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();
  }
}
