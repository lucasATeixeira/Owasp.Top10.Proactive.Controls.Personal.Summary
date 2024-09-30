import { WorkspacesService } from './workspaces.service';
import { MemoryWorkspacesRepository } from './repositories/memory-workspaces.repository';
import { ForbiddenException } from '@nestjs/common';
import { MemoryUsersRepository } from '~/modules/users/repositories/memory-users.repository';
import { User } from '~/db/types';
import { MemoryWorkspacePoliciesRepository } from '../workspace-policies/repositories/memory-workspace-policies.repository';
import { workspaceDefaultPermissions } from '@repo/authorization';

describe('WorkspacesService', () => {
  let workspacesService: WorkspacesService;
  let workspacesRepository: MemoryWorkspacesRepository;
  let usersRepository: MemoryUsersRepository;
  let workspacePoliciesRepository: MemoryWorkspacePoliciesRepository;
  let user: User;
  let userWithoutPermission: User;

  beforeEach(async () => {
    usersRepository = new MemoryUsersRepository();
    workspacesRepository = new MemoryWorkspacesRepository();
    workspacePoliciesRepository = new MemoryWorkspacePoliciesRepository();
    workspacesService = new WorkspacesService(
      workspacesRepository,
      usersRepository,
      workspacePoliciesRepository,
    );

    user = await usersRepository.create({
      email: 'test@test.com',
      name: 'Test',
      password: 'Abcd123@',
      role: 'PRO_USER',
    });

    userWithoutPermission = await usersRepository.create({
      email: 'test2@test.com',
      name: 'Without permission',
      password: 'Abcd123@',
      role: 'USER',
    });
  });

  describe('create', () => {
    describe('When user create a workspace', () => {
      it('should return a workspace if user has the right permission', async () => {
        const workspace = await workspacesService.create(user.id, {
          name: 'Test',
        });
        expect(workspace).toBeDefined();
        expect(workspace.id).toBeDefined();
      });

      it('should create a workspace policy record with default permissions', async () => {
        const workspace = await workspacesService.create(user.id, {
          name: 'Test',
        });

        const policies =
          await workspacePoliciesRepository.getWorkspacePoliciesByRoleId({
            roleId: null,
            workspaceId: workspace.id,
          });

        const policiesAttributesQuantity = policies.reduce((acc, policy) => {
          return acc + (policy.permissions?.split(',').length ?? 0);
        }, 0);

        const defaultPoliciesQuantity = Object.values(
          workspaceDefaultPermissions,
        ).reduce((acc, permissions) => {
          return acc + permissions.length;
        }, 0);

        const policiesCheck = policies.every((policy) => {
          const defaultAttributes = workspaceDefaultPermissions[policy.domain];
          return defaultAttributes?.every((attribute) =>
            policy.permissions?.includes(attribute),
          );
        });

        expect(policies).toBeDefined();
        expect(policiesAttributesQuantity).toBe(defaultPoliciesQuantity);
        expect(policiesCheck).toBe(true);
      });
    });

    describe('When user tries to create a workspace with invalid ownerId', () => {
      it('should return an error', async () => {
        await expect(
          workspacesService.create('invalidId', {
            name: 'Test',
          }),
        ).rejects.toThrow('Invalid ownerId');
      });
    });

    describe('When user tries to create a workspace without having the right permission', () => {
      it('should return a Forbidden error', async () => {
        await expect(
          workspacesService.create(userWithoutPermission.id, {
            name: 'Test',
          }),
        ).rejects.toThrow(ForbiddenException);
      });
    });
  });
});
