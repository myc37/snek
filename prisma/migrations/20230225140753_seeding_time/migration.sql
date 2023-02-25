/*
  Warnings:

  - You are about to drop the column `isCash` on the `Parcel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PackageTypeBonusStructure" ALTER COLUMN "bonus" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Parcel" DROP COLUMN "isCash",
ALTER COLUMN "failureReason" DROP NOT NULL;
