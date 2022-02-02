/*
  Warnings:

  - You are about to drop the column `abbreviations` on the `State` table. All the data in the column will be lost.
  - Added the required column `abbreviation` to the `State` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "State" DROP COLUMN "abbreviations",
ADD COLUMN     "abbreviation" TEXT NOT NULL;
