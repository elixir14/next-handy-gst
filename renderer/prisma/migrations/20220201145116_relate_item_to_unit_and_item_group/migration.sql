-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "itemId" INTEGER;

-- AlterTable
ALTER TABLE "item_group" ADD COLUMN     "itemId" INTEGER;

-- AddForeignKey
ALTER TABLE "item_group" ADD CONSTRAINT "item_group_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
