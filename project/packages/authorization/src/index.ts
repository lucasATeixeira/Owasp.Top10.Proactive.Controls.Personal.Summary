import { z } from "zod";
import { User, WorkspaceOwnership, WorkspacePolicies } from "./models";
import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from "@casl/ability";
import { userSubject, workspaceSubject } from "./subjects";
import { permissions } from "./permissions";

export * from "./models";

const appAbilitiesSchema = z.union([
  userSubject,
  workspaceSubject,
  z.tuple([z.literal("manage"), z.literal("all")]),
]);

type AppAbilities = z.infer<typeof appAbilitiesSchema>;
export type AppAbility = MongoAbility<AppAbilities>;
const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilityFor({
  user,
  workspaceOwnership,
  workspacePolicies,
}: {
  user: User;
  workspaceOwnership?: WorkspaceOwnership;
  workspacePolicies?: WorkspacePolicies;
}) {
  const builder = new AbilityBuilder(createAppAbility);

  if (typeof permissions[user.role] !== "function") {
    throw new Error(`Permissions for role ${user.role} not found.`);
  }

  permissions[user.role]({
    user,
    builder,
    workspaceOwnership,
    workspacePolicies,
  });

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename!;
    },
  });

  ability.can = ability.can.bind(ability);
  ability.cannot = ability.cannot.bind(ability);

  return ability;
}
