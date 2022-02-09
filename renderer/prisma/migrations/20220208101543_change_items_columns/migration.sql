/*
  Warnings:

  - You are about to drop the column `item_id` on the `outward_chalaan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "outward_chalaan" DROP CONSTRAINT "outward_chalaan_item_id_fkey";

-- AlterTable
ALTER TABLE "outward_chalaan" DROP COLUMN "item_id";
