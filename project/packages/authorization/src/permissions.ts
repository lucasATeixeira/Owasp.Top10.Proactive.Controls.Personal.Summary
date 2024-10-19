import { AbilityBuilder } from "@casl/ability";
import { User, Workspace, WorkspacePolicies } from "./models";
import { AppAbility } from ".";
import { Role } from "./roles";

type PermissionsByRole = (props: {
  user: User;
  workspace?: Workspace;
  workspacePolicies?: WorkspacePolicies[];
  builder: AbilityBuilder<AppAbility>;
}) => void;

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN: ({ builder: { can } }) => {
    can("manage", "all");
  },
  USER: ({ user, builder: { can }, workspacePolicies = [] }) => {
    can(["get", "update"], "User", {
      id: {
        $eq: user.id,
      },
    });

    can("get", "Workspace");

    can("create", "WorkspaceMembership");

    can("delete", "WorkspaceMembership", {
      userId: {
        $eq: user.id,
      },
    });

    can(["delete", "get", "update"], "Post", {
      authorId: {
        $eq: user.id,
      },
    });

    workspacePolicies.forEach(({ domain, permissions }) => {
      if (permissions) {
        const permissionsArray = permissions.split(",") as Array<
          "manage" | "create" | "get" | "update" | "delete"
        >;
        // @TODO adjust domain type
        can(permissionsArray, domain as "Post");
      }
    });
  },
  PRO_USER: ({ user, builder, workspace, workspacePolicies = [] }) => {
    const { can } = builder;
    // PRO USER CAN DO WATHEVER THE USER CAN PLUS SOME EXTRAS
    permissions.USER({
      user,
      builder,
      workspacePolicies,
      workspace,
    });

    can("create", "Workspace");

    can("manage", "Workspace", {
      ownerId: {
        $eq: user.id,
      },
    });

    if (user.id === workspace?.ownerId) {
      can("manage", "WorkspaceMembership");
    }
  },
};

export const workspaceDefaultPermissions: Record<string, string[]> = {
  Post: ["get", "create"],
};
