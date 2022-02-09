-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "city_id" INTEGER,
ADD COLUMN     "state_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("id") ON DELETE SET NULL ON UPDATE CASCADE;
