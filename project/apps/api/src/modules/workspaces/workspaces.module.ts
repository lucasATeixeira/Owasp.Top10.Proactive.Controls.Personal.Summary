import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesRepository } from './repositories/workspaces.repository';
import { UsersRepository } from '../users/repositories/users.repository';
import { WorkspacePoliciesRepository } from '../workspace-policies/repositories/workspace-policies.repository';

@Module({
  controllers: [WorkspacesController],
  providers: [
    WorkspacesService,
    WorkspacesRepository,
    UsersRepository,
    WorkspacePoliciesRepository,
  ],
})
export class WorkspacesModule {}
