import { IsUUID } from 'class-validator';

export class SubscribeToWorkspaceDto {
  @IsUUID()
  workspaceId: string;
}
