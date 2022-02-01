/*
  Warnings:

  - Added the required column `updated_at` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ItemGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Process` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Transport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ItemGroup" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Process" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Transport" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
