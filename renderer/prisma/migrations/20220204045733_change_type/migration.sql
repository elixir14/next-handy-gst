/*
  Warnings:

  - Changed the type of `min_inward_days` on the `Process` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Process" DROP COLUMN "min_inward_days",
ADD COLUMN     "min_inward_days" INTEGER NOT NULL;
