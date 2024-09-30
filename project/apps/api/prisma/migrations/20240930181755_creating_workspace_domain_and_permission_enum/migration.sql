/*
  Warnings:

  - Changed the type of `domain` on the `WorkspacePolicy` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "WorkspaceDomain" AS ENUM ('Post', 'Ban');

-- CreateEnum
CREATE TYPE "WorkspacePermission" AS ENUM ('manage', 'create', 'get', 'update', 'delete');

-- AlterTable
ALTER TABLE "WorkspacePolicy" DROP COLUMN "domain",
ADD COLUMN     "domain" "WorkspaceDomain" NOT NULL;
