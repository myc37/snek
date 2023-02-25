/*
  Warnings:

  - The values [CASH_ON_DELIVERY] on the enum `DeliveryType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DeliveryType_new" AS ENUM ('CONTACTLESS', 'IN_PERSON', 'RETURN');
ALTER TABLE "Parcel" ALTER COLUMN "type" TYPE "DeliveryType_new" USING ("type"::text::"DeliveryType_new");
ALTER TYPE "DeliveryType" RENAME TO "DeliveryType_old";
ALTER TYPE "DeliveryType_new" RENAME TO "DeliveryType";
DROP TYPE "DeliveryType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Parcel" DROP CONSTRAINT "Parcel_driverId_fkey";

-- AlterTable
ALTER TABLE "Parcel" ADD COLUMN     "isCash" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "driverId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Parcel" ADD CONSTRAINT "Parcel_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;
