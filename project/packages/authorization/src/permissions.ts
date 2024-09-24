import { AbilityBuilder } from "@casl/ability";
import { User } from "./models";
import { AppAbility } from ".";
import { Role } from "./roles";

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void;

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN: (_, { can }) => {
    can("manage", "all");
  },
  PRO_USER: (user, { can }) => {
    can(["get", "update"], "User", {
      id: {
        $eq: user.id,
      },
    });
  },
  USER: (user, { can }) => {
    can(["get", "update"], "User", {
      id: {
        $eq: user.id,
      },
    });
  },
};
