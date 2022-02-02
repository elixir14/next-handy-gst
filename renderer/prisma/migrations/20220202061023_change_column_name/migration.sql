/*
  Warnings:

  - You are about to drop the column `groupId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `unitId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_unitId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "groupId",
DROP COLUMN "unitId",
ADD COLUMN     "group_id" INTEGER,
ADD COLUMN     "unit_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
