-- CreateTable
CREATE TABLE "outward_chalaan" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "number" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "bags" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "supplier_id" INTEGER,
    "process_id" INTEGER,
    "item_id" INTEGER,
    "transport_id" INTEGER,

    CONSTRAINT "outward_chalaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outward_chalaan_item" (
    "id" SERIAL NOT NULL,
    "quantity" TEXT NOT NULL,
    "net_weight" TEXT NOT NULL,
    "gross_weight" TEXT NOT NULL,
    "remark" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "item_id" INTEGER,

    CONSTRAINT "outward_chalaan_item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "outward_chalaan" ADD CONSTRAINT "outward_chalaan_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outward_chalaan" ADD CONSTRAINT "outward_chalaan_process_id_fkey" FOREIGN KEY ("process_id") REFERENCES "Process"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outward_chalaan" ADD CONSTRAINT "outward_chalaan_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outward_chalaan" ADD CONSTRAINT "outward_chalaan_transport_id_fkey" FOREIGN KEY ("transport_id") REFERENCES "Transport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outward_chalaan_item" ADD CONSTRAINT "outward_chalaan_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
