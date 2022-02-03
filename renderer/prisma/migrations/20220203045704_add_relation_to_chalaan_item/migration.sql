-- AlterTable
ALTER TABLE "outward_chalaan_item" ADD COLUMN     "outward_chalaanId" INTEGER;

-- AddForeignKey
ALTER TABLE "outward_chalaan_item" ADD CONSTRAINT "outward_chalaan_item_outward_chalaanId_fkey" FOREIGN KEY ("outward_chalaanId") REFERENCES "outward_chalaan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
