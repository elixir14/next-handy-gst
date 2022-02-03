/*
  Warnings:

  - You are about to drop the column `CGST` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `IGST` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `SGST` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `outward_challan_next_number` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `prefix` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `signatory_label` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `suffix` on the `Settings` table. All the data in the column will be lost.
  - Added the required column `key` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "CGST",
DROP COLUMN "IGST",
DROP COLUMN "SGST",
DROP COLUMN "outward_challan_next_number",
DROP COLUMN "prefix",
DROP COLUMN "rate",
DROP COLUMN "signatory_label",
DROP COLUMN "suffix",
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;
