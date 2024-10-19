import { WorkspaceMembershipsService } from './workspace-memberships.service';
import { MemoryWorkspaceMembershipsRepository } from './repositories/memory-workspace-memberships.repository';
import { MemoryWorkspacesRepository } from '../workspaces/repositories/memory-workspaces.repository';
import { MemoryUsersRepository } from '../users/repositories/memory-users.repository';

describe('WorkspaceMembershipsService', () => {
  let workspaceMembershipsService: WorkspaceMembershipsService;
  let workspaceMembershipsRepository: MemoryWorkspaceMembershipsRepository;
  let usersRepository: MemoryUsersRepository;
  let workspacesRepository: MemoryWorkspacesRepository;

  beforeEach(async () => {
    workspaceMembershipsRepository = new MemoryWorkspaceMembershipsRepository();
    workspaceMembershipsService = new WorkspaceMembershipsService(
      workspaceMembershipsRepository,
    );
  });

  describe('create', () => {
    describe('When user create a workspace membership', () => {
      it('should return a workspace membership', async () => {});
    });

    describe('When user tries to create a workspace membership with invalid userId', () => {
      it('should return an error', async () => {});
    });

    describe('When user tries to create a workspace membership with invalid workspaceId', () => {
      it('should return an error', async () => {});
    });

    describe('When user tries to create a workspace membership without having the right permission', () => {
      it('should return a Forbidden error', async () => {});
    });

    describe('When user tries to create a workspace membership that already exists', () => {
      it('should return an error', async () => {});
    });
  });
});
