/*
  Warnings:

  - You are about to drop the column `end_time` on the `Process` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `Process` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Process` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Process" DROP COLUMN "end_time",
DROP COLUMN "start_time",
ADD COLUMN     "duration" INTEGER NOT NULL;
