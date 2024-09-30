import { Injectable } from '@nestjs/common';
import { IWorkspacePoliciesRepository } from './iworkspace-policies.repository';
import { WorkspacePolicy } from '~/db/types';
import { CreateWorkspacePolicyDto } from '../dto/create-workspace-policy.dto';
import { randomUUID } from 'crypto';
import { GetWorkspacePoliciesByRoleIdDto } from '../dto/get-workspace-policies-by-role-id.dto';

@Injectable()
export class MemoryWorkspacePoliciesRepository
  implements IWorkspacePoliciesRepository
{
  private policies: WorkspacePolicy[] = [];

  async create(
    createWorkspacePolicyDto: CreateWorkspacePolicyDto,
  ): Promise<WorkspacePolicy> {
    const policy = {
      id: randomUUID() as string,
      ...createWorkspacePolicyDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.policies.push(policy);
    return policy;
  }

  async getWorkspacePoliciesByRoleId({
    roleId,
    workspaceId,
  }: GetWorkspacePoliciesByRoleIdDto): Promise<WorkspacePolicy[]> {
    return this.policies.filter(
      (policy) =>
        policy.workspaceId === workspaceId && policy.roleId === roleId,
    );
  }
}
