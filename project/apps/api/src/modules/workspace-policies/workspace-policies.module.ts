import { Module } from '@nestjs/common';
import { WorkspacePoliciesService } from './workspace-policies.service';
import { WorkspacePoliciesController } from './workspace-policies.controller';

@Module({
  controllers: [WorkspacePoliciesController],
  providers: [WorkspacePoliciesService],
})
export class WorkspacePoliciesModule {}
