/*
  Warnings:

  - You are about to drop the `ItemGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ItemGroup";

-- CreateTable
CREATE TABLE "item_group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_group_pkey" PRIMARY KEY ("id")
);
