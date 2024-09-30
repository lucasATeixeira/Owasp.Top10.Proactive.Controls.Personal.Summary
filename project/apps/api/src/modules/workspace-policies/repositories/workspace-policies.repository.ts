import { Injectable } from '@nestjs/common';
import { IWorkspacePoliciesRepository } from './iworkspace-policies.repository';
import { CreateWorkspacePolicyDto } from '../dto/create-workspace-policy.dto';
import { db } from '~/db';
import { randomUUID } from 'crypto';
import { WorkspacePolicy } from '~/db/types';
import { GetWorkspacePoliciesByRoleIdDto } from '../dto/get-workspace-policies-by-role-id.dto';

@Injectable()
export class WorkspacePoliciesRepository
  implements IWorkspacePoliciesRepository
{
  async create(
    createWorkspacePolicyDto: CreateWorkspacePolicyDto,
  ): Promise<WorkspacePolicy> {
    return db
      .insertInto('WorkspacePolicy')
      .values({
        id: randomUUID() as string,
        ...createWorkspacePolicyDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async getWorkspacePoliciesByRoleId({
    roleId,
    workspaceId,
  }: GetWorkspacePoliciesByRoleIdDto): Promise<WorkspacePolicy[]> {
    let query = db
      .selectFrom('WorkspacePolicy')
      .selectAll()
      .where('workspaceId', '=', workspaceId);

    if (roleId) {
      query = query.where('roleId', '=', roleId);
    } else {
      query = query.where('roleId', 'is', null);
    }

    return query.execute();
  }
}
