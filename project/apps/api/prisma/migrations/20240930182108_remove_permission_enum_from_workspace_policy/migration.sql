/*
  Warnings:

  - The `permissions` column on the `WorkspacePolicy` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "WorkspacePolicy" DROP COLUMN "permissions",
ADD COLUMN     "permissions" TEXT;
