/*
  Warnings:

  - You are about to drop the column `itemId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `Unit` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_itemId_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "itemId";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "groupId" INTEGER,
ADD COLUMN     "unitId" INTEGER;

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "itemId";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
