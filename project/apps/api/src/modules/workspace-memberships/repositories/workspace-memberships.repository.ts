import { Injectable } from '@nestjs/common';
import { IWorkspaceMembershipsRepository } from './iworkspace-memberships.repository';
import { CreateWorkspaceMembershipDto } from '../dto/create-worskpace-membership.dto';
import { WorkspaceMembership } from '~/db/types';
import { db } from '~/db';
import { randomUUID } from 'crypto';

@Injectable()
export class WorkspaceMembershipsRepository
  implements IWorkspaceMembershipsRepository
{
  async create(
    userId: string,
    createWorkspaceMembershipDto: CreateWorkspaceMembershipDto,
  ): Promise<WorkspaceMembership> {
    return db
      .insertInto('WorkspaceMembership')
      .values({
        id: randomUUID() as string,
        userId,
        ...createWorkspaceMembershipDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
