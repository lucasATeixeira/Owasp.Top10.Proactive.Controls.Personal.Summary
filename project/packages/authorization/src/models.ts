import { z } from "zod";
import { roleSchema } from "./roles";

export const userSchema = z.object({
  __typename: z.literal("User").default("User"),
  id: z.string(),
  role: roleSchema,
});

export type User = z.infer<typeof userSchema>;

export const workspacePoliciesSchema = z.object({
  id: z.string(),
  domain: z.string(),
  permissions: z.string(),
});

export type WorkspacePolicies = z.infer<typeof workspacePoliciesSchema>;

export const workspaceSchema = z.object({
  __typename: z.literal("Workspace").default("Workspace"),
  id: z.string(),
  ownerId: z.string(),
});

export type Workspace = z.infer<typeof workspaceSchema>;

export const workspaceMembershipSchema = z.object({
  __typename: z.literal("WorkspaceMembership").default("WorkspaceMembership"),
  id: z.string(),
  userId: z.string(),
  workspaceId: z.string(),
});

export type WorkspaceMembership = z.infer<typeof workspaceMembershipSchema>;

export const postSchema = z.object({
  __typename: z.literal("Post").default("Post"),
  id: z.string(),
  authorId: z.string(),
  workspaceId: z.string(),
});

export type Post = z.infer<typeof postSchema>;
