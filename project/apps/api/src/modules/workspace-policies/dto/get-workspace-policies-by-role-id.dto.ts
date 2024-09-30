import { IsUUID, ValidateIf } from 'class-validator';

export class GetWorkspacePoliciesByRoleIdDto {
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  roleId: string | null;
  @IsUUID()
  workspaceId: string;
}
