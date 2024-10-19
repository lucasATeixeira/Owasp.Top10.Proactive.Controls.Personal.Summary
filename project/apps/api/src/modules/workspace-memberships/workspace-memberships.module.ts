import { Module } from '@nestjs/common';
import { WorkspaceMembershipsService } from './workspace-memberships.service';
import { WorkspaceMembershipsController } from './workspace-memberships.controller';

@Module({
  controllers: [WorkspaceMembershipsController],
  providers: [WorkspaceMembershipsService],
})
export class WorkspaceMembershipsModule {}
