import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { workspaceDefaultPermissions } from '@repo/authorization';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { Workspace } from '~/db/types';
import { WorkspacesRepository } from './repositories/workspaces.repository';
import { UsersRepository } from '../users/repositories/users.repository';
import { defineAbilityFor, userSchema } from '@repo/authorization';
import { WorkspacePoliciesRepository } from '../workspace-policies/repositories/workspace-policies.repository';
import { WorkspaceDomain } from '~/db/enums';

@Injectable()
export class WorkspacesService {
  constructor(
    private readonly workspacesRepository: WorkspacesRepository,
    private readonly usersRepository: UsersRepository,
    private readonly workspacePoliciesRepository: WorkspacePoliciesRepository,
  ) {}

  async create(
    ownerId: string,
    createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<Workspace> {
    const user = await this.usersRepository.findById(ownerId);

    if (!user) {
      throw new HttpException('Invalid ownerId', 400);
    }

    const parsedUser = userSchema.parse(user);

    const { can } = defineAbilityFor({
      user: parsedUser,
    });

    if (!can('create', 'Workspace')) {
      throw new ForbiddenException();
    }

    const workspace = await this.workspacesRepository.create(
      ownerId,
      createWorkspaceDto,
    );

    const promises = Object.entries(workspaceDefaultPermissions).map(
      async ([domain, permissions]) => {
        await this.workspacePoliciesRepository.create({
          workspaceId: workspace.id,
          roleId: null,
          domain: domain as WorkspaceDomain,
          permissions: permissions.join(','),
        });
      },
    );

    await Promise.allSettled(promises);

    return workspace;
  }
}
