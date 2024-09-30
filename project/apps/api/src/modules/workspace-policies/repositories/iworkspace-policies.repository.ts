import { WorkspacePolicy } from '~/db/types';
import { CreateWorkspacePolicyDto } from '../dto/create-workspace-policy.dto';
import { GetWorkspacePoliciesByRoleIdDto } from '../dto/get-workspace-policies-by-role-id.dto';

export interface IWorkspacePoliciesRepository {
  create(
    createWorkspacePolicyDto: CreateWorkspacePolicyDto,
  ): Promise<WorkspacePolicy>;
  getWorkspacePoliciesByRoleId(
    getWorkspacePoliciesByRoleIdDto: GetWorkspacePoliciesByRoleIdDto,
  ): Promise<WorkspacePolicy[]>;
}
