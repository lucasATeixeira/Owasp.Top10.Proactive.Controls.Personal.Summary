import { AbilityBuilder } from "@casl/ability";
import { User, WorkspaceMembership, WorkspacePolicies } from "./models";
import { AppAbility } from ".";
import { Role } from "./roles";

type PermissionsByRole = (props: {
  user: User;
  workspaceMembership?: WorkspaceMembership;
  workspacePolicies?: WorkspacePolicies;
  builder: AbilityBuilder<AppAbility>;
}) => void;

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN: ({ builder: { can } }) => {
    can("manage", "all");
  },
  USER: ({ user, builder: { can } }) => {
    can(["get", "update"], "User", {
      id: {
        $eq: user.id,
      },
    });

    can("get", "Workspace");
  },
  PRO_USER: ({ user, builder, workspaceMembership }) => {
    const { can } = builder;
    // PRO USER CAN DO WATHEVER THE USER CAN PLUS SOME EXTRAS
    permissions.USER({
      user,
      builder,
      workspaceMembership,
    });

    if (workspaceMembership?.owner) {
      can("manage", "Workspace");
    }

    can("create", "Workspace");
  },
};
