/*
  Warnings:

  - Added the required column `updated_at` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `State` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "City" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "State" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
