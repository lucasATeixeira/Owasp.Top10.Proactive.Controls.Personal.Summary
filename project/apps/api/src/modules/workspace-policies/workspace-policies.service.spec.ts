import { Test, TestingModule } from '@nestjs/testing';
import { WorkspacePoliciesService } from './workspace-policies.service';

describe('WorkspacePoliciesService', () => {
  let service: WorkspacePoliciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspacePoliciesService],
    }).compile();

    service = module.get<WorkspacePoliciesService>(WorkspacePoliciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
