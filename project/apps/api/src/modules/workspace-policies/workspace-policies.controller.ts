import { Controller } from '@nestjs/common';
import { WorkspacePoliciesService } from './workspace-policies.service';

@Controller('workspace-policies')
export class WorkspacePoliciesController {
  constructor(private readonly workspacePoliciesService: WorkspacePoliciesService) {}
}
