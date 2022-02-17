-- CreateTable
CREATE TABLE public."Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "mfg_details" TEXT NOT NULL,
    "address" JSONB NOT NULL,
    "city" TEXT NOT NULL,
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

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_gst_number_key" ON "Company"("gst_number");

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" SERIAL NOT NULL,
    "gst_code" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(64) NOT NULL,
    "first_name" VARCHAR(32) NOT NULL,
    "last_name" VARCHAR(32) NOT NULL,
    "phone" TEXT NOT NULL,
    "email" VARCHAR(128) NOT NULL,
    "code" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "address" JSONB NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fax_number" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
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
    "city_id" INTEGER,
    "state_id" INTEGER,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Process" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "min_inward_days" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "classification_code" TEXT NOT NULL,
    "drawing_code" TEXT NOT NULL,
    "drawing_file" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "group_id" INTEGER,
    "unit_id" INTEGER,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transport" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "vehicle" TEXT NOT NULL,
    "vehicle_number" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

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
    "outward_chalaan_id" INTEGER,

    CONSTRAINT "outward_chalaan_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);


-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_email_key" ON "Supplier"("email");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outward_chalaan" ADD CONSTRAINT "outward_chalaan_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outward_chalaan" ADD CONSTRAINT "outward_chalaan_process_id_fkey" FOREIGN KEY ("process_id") REFERENCES "Process"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outward_chalaan" ADD CONSTRAINT "outward_chalaan_transport_id_fkey" FOREIGN KEY ("transport_id") REFERENCES "Transport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outward_chalaan_item" ADD CONSTRAINT "outward_chalaan_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outward_chalaan_item" ADD CONSTRAINT "outward_chalaan_item_outward_chalaan_id_fkey" FOREIGN KEY ("outward_chalaan_id") REFERENCES "outward_chalaan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
