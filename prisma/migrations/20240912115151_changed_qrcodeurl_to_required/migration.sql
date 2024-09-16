/*
  Warnings:

  - Made the column `qrCodeImageUrl` on table `Tables` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tables" ALTER COLUMN "qrCodeImageUrl" SET NOT NULL;
