-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "address" JSONB NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fax_number" TEXT NOT NULL,
    "primary_name" TEXT NOT NULL,
    "primary_designation" TEXT NOT NULL,
    "primary_phone" TEXT NOT NULL,
    "primary_email" TEXT NOT NULL,
    "cst_no" TEXT NOT NULL,
    "ecc_no" TEXT NOT NULL,
    "tin_number" TEXT NOT NULL,
    "gst_number" TEXT NOT NULL,
    "pan_number" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_email_key" ON "Supplier"("email");
