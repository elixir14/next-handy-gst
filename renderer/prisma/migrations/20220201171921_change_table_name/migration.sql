/*
  Warnings:

  - You are about to drop the `item_group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "item_group" DROP CONSTRAINT "item_group_itemId_fkey";

-- DropTable
DROP TABLE "item_group";

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "itemId" INTEGER,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
