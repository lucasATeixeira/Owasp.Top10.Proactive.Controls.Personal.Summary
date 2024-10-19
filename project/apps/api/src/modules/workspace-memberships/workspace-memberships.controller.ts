import { Controller } from '@nestjs/common';
import { WorkspaceMembershipsService } from './workspace-memberships.service';

@Controller('workspace-memberships')
export class WorkspaceMembershipsController {
  constructor(private readonly workspaceMembershipsService: WorkspaceMembershipsService) {}
}
