import { Workspace } from '~/db/types';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';

export interface IWorkspacesRepository {
  create(
    ownerId: string,
    createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<Workspace>;
}
