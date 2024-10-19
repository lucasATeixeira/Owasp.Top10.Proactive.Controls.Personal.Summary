import { Injectable } from '@nestjs/common';
import { IWorkspaceMembershipsRepository } from './iworkspace-memberships.repository';
import { CreateWorkspaceMembershipDto } from '../dto/create-worskpace-membership.dto';
import { WorkspaceMembership } from '~/db/types';
import { randomUUID } from 'crypto';

@Injectable()
export class MemoryWorkspaceMembershipsRepository
  implements IWorkspaceMembershipsRepository
{
  private workspaceMemberships: WorkspaceMembership[] = [];

  async create(
    userId: string,
    createWorkspaceMembershipDto: CreateWorkspaceMembershipDto,
  ): Promise<WorkspaceMembership> {
    const workspaceMembership = {
      id: randomUUID() as string,
      userId,
      ...createWorkspaceMembershipDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.workspaceMemberships.push(workspaceMembership);
    return workspaceMembership;
  }
}
