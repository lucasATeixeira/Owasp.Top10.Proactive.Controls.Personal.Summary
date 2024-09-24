import { z } from "zod";
import { roleSchema } from "./roles";

export const userSchema = z.object({
  __typename: z.literal("User").default("User"),
  id: z.string(),
  role: roleSchema,
});

export type User = z.infer<typeof userSchema>;

export const workspaceOwnershipSchema = z.object({
  id: z.string(),
  userId: z.string(),
  workspaceId: z.string(),
  roleId: z.string(),
  owner: z.boolean(),
});

export type WorkspaceOwnership = z.infer<typeof workspaceOwnershipSchema>;

export const workspacePoliciesSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  roleId: z.string(),
  permissions: z.string(),
});

export type WorkspacePolicies = z.infer<typeof workspacePoliciesSchema>;
