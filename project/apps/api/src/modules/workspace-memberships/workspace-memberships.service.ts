import { Injectable } from '@nestjs/common';
import { WorkspaceMembershipsRepository } from './repositories/workspace-memberships.repository';
import { SubscribeToWorkspaceDto } from './dto/subscribe-to-workspace.dto';
import { WorkspaceMembership } from '~/db/types';

@Injectable()
export class WorkspaceMembershipsService {
  constructor(
    private readonly workspaceMembershipsRepository: WorkspaceMembershipsRepository,
  ) {}

  async create(
    userId: string,
    subscribeToWorkspaceDto: SubscribeToWorkspaceDto,
  ): Promise<WorkspaceMembership> {
    return this.workspaceMembershipsRepository.create(userId, {
      ...subscribeToWorkspaceDto,
      roleId: null,
    });
  }
}
