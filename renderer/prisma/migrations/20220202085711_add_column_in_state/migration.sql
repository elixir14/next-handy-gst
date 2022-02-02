/*
  Warnings:

  - Added the required column `priority` to the `State` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "State" ADD COLUMN     "priority" TEXT NOT NULL;
