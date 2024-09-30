import { IsEnum, IsUUID, Matches, ValidateIf } from 'class-validator';
import { WorkspaceDomain } from '~/db/enums';

export class CreateWorkspacePolicyDto {
  @IsUUID()
  workspaceId: string;

  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  roleId: string | null;

  @IsEnum(WorkspaceDomain)
  domain: WorkspaceDomain;

  // match string1,string2,string3
  @Matches(/^[a-zA-Z0-9@$!%*?&]+(,[a-zA-Z0-9@$!%*?&]+)*$/)
  permissions: string;
}
