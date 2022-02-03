/*
  Warnings:

  - You are about to drop the column `outward_chalaanId` on the `outward_chalaan_item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "outward_chalaan_item" DROP CONSTRAINT "outward_chalaan_item_outward_chalaanId_fkey";

-- AlterTable
ALTER TABLE "outward_chalaan_item" DROP COLUMN "outward_chalaanId",
ADD COLUMN     "outward_chalaan_id" INTEGER;

-- AddForeignKey
ALTER TABLE "outward_chalaan_item" ADD CONSTRAINT "outward_chalaan_item_outward_chalaan_id_fkey" FOREIGN KEY ("outward_chalaan_id") REFERENCES "outward_chalaan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
