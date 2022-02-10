-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "mfg_details" TEXT NOT NULL,
    "address" JSONB NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "fax_number" TEXT NOT NULL,
    "tin_number" TEXT NOT NULL,
    "cst_number" TEXT NOT NULL,
    "ecc_number" TEXT NOT NULL,
    "reg_number" TEXT NOT NULL,
    "gst_number" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cityId" INTEGER,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_gst_number_key" ON "Company"("gst_number");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;
