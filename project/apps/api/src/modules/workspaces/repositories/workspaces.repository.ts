import { Injectable } from '@nestjs/common';
import { IWorkspacesRepository } from './iworkspaces.repository';
import { db } from '~/db';
import { randomUUID } from 'crypto';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { Workspace } from '~/db/types';

@Injectable()
export class WorkspacesRepository implements IWorkspacesRepository {
  public async create(
    ownerId: string,
    createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<Workspace> {
    return db
      .insertInto('Workspace')
      .values({
        id: randomUUID() as string,
        ownerId,
        ...createWorkspaceDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
