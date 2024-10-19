import { IsUUID, ValidateIf } from 'class-validator';

export class CreateWorkspaceMembershipDto {
  @IsUUID()
  workspaceId: string;

  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  roleId: string | null;
}
