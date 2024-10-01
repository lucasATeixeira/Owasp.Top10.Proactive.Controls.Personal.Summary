export const Role = {
    ADMIN: "ADMIN",
    PRO_USER: "PRO_USER",
    USER: "USER"
} as const;
export type Role = (typeof Role)[keyof typeof Role];
export const WorkspaceDomain = {
    Post: "Post",
    Ban: "Ban"
} as const;
export type WorkspaceDomain = (typeof WorkspaceDomain)[keyof typeof WorkspaceDomain];
export const WorkspacePermission = {
    manage: "manage",
    create: "create",
    get: "get",
    update: "update",
    delete: "delete"
} as const;
export type WorkspacePermission = (typeof WorkspacePermission)[keyof typeof WorkspacePermission];
