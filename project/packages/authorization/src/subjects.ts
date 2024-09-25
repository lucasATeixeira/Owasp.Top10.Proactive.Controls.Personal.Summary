import { z } from "zod";
import { userSchema, workspaceSchema } from "./models";

export const userSubject = z.tuple([
  z.union([
    z.literal("manage"),
    z.literal("get"),
    z.literal("update"),
    z.literal("delete"),
  ]),
  z.union([z.literal("User"), userSchema]),
]);

export type UserSubject = z.infer<typeof userSubject>;

export const workspaceSubject = z.tuple([
  z.union([
    z.literal("manage"),
    z.literal("create"),
    z.literal("get"),
    z.literal("update"),
    z.literal("delete"),
  ]),
  z.union([z.literal("Workspace"), workspaceSchema]),
]);
