import { WorkspaceMembership } from '~/db/types';
import { CreateWorkspaceMembershipDto } from '../dto/create-worskpace-membership.dto';

export interface IWorkspaceMembershipsRepository {
  create(
    userId: string,
    createWorkspaceMembershipDto: CreateWorkspaceMembershipDto,
  ): Promise<WorkspaceMembership>;
}
