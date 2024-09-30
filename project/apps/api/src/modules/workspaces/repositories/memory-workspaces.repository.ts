import { Injectable } from '@nestjs/common';
import { Workspace } from '~/db/types';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { randomUUID } from 'crypto';
import { IWorkspacesRepository } from './iworkspaces.repository';

@Injectable()
export class MemoryWorkspacesRepository implements IWorkspacesRepository {
  private workspaces: Workspace[] = [];

  async create(
    ownerId: string,
    createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<Workspace> {
    const workspace = {
      id: randomUUID() as string,
      ownerId,
      ...createWorkspaceDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.workspaces.push(workspace);
    return workspace;
  }
}
