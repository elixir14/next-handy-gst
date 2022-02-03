-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "prefix" TEXT NOT NULL,
    "suffix" TEXT NOT NULL,
    "SGST" TEXT NOT NULL,
    "CGST" TEXT NOT NULL,
    "IGST" TEXT NOT NULL,
    "signatory_label" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "outward_challan_next_number" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
