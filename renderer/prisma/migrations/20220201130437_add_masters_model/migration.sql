-- CreateTable
CREATE TABLE "Process" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "min_inward_days" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "ItemGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "drawing_code" TEXT NOT NULL,
    "drawing_file" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transport" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "vehicle" TEXT NOT NULL,
    "vehicle_number" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,

    CONSTRAINT "Transport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);
