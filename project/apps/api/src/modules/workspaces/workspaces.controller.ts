import { Body, Controller, Post } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { JwtPayload } from '../authentication/jwt-payload.decorator';
import { JwtPayloadDto } from '../authentication/dto/jwt-payload.dto';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  async create(
    @JwtPayload() payload: JwtPayloadDto,
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ) {
    return this.workspacesService.create(payload.sub, createWorkspaceDto);
  }
}
