import { z } from "zod";
import { User, WorkspacePolicies } from "./models";
import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from "@casl/ability";
import { postSubject, userSubject, workspaceSubject } from "./subjects";
import { permissions } from "./permissions";

export * from "./models";
export * from "./roles";
export * from "./permissions";

const appAbilitiesSchema = z.union([
  userSubject,
  workspaceSubject,
  postSubject,
  z.tuple([z.literal("manage"), z.literal("all")]),
]);

type AppAbilities = z.infer<typeof appAbilitiesSchema>;
export type AppAbility = MongoAbility<AppAbilities>;
const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilityFor({
  user,
  workspacePolicies,
}: {
  user: User;
  workspacePolicies?: WorkspacePolicies[];
}) {
  const builder = new AbilityBuilder(createAppAbility);

  if (typeof permissions[user.role] !== "function") {
    throw new Error(`Permissions for role ${user.role} not found.`);
  }

  permissions[user.role]({
    user,
    builder,
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
