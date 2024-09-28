import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { Role } from "./enums";

export type User = {
    id: string;
    name: string;
    email: string;
    role: Role;
    password: string;
    /**
     * @kyselyType(Date)
     */
    passwordLastChanged: Date;
    /**
     * @kyselyType(Date)
     */
    createdAt: Date;
    /**
     * @kyselyType(Date)
     */
    updatedAt: Date;
};
export type Workspace = {
    id: string;
    ownerId: string;
    name: string;
    slug: string;
    /**
     * @kyselyType(Date)
     */
    createdAt: Date;
    /**
     * @kyselyType(Date)
     */
    updatedAt: Date;
};
export type WorkspaceMembership = {
    id: string;
    userId: string;
    workspaceId: string;
    roleId: string;
    /**
     * @kyselyType(Date)
     */
    createdAt: Date;
    /**
     * @kyselyType(Date)
     */
    updatedAt: Date;
};
export type WorkspacePolicy = {
    id: string;
    workspaceId: string;
    roleId: string | null;
    domain: string;
    permissions: string | null;
    /**
     * @kyselyType(Date)
     */
    createdAt: Date;
    /**
     * @kyselyType(Date)
     */
    updatedAt: Date;
};
export type WorkspaceRole = {
    id: string;
    workspaceId: string;
    name: string;
    /**
     * @kyselyType(Date)
     */
    createdAt: Date;
    /**
     * @kyselyType(Date)
     */
    updatedAt: Date;
};
export type DB = {
    User: User;
    Workspace: Workspace;
    WorkspaceMembership: WorkspaceMembership;
    WorkspacePolicy: WorkspacePolicy;
    WorkspaceRole: WorkspaceRole;
};
