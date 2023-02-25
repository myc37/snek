/*
  Warnings:

  - You are about to drop the column `criteria` on the `PackageTypeBonusStructure` table. All the data in the column will be lost.
  - You are about to drop the column `countryConfigCountryConfigId` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the column `accessibilityBonus` on the `VehicleConf` table. All the data in the column will be lost.
  - You are about to drop the column `cashOnDeliveryBonus` on the `VehicleConf` table. All the data in the column will be lost.
  - You are about to drop the column `incentivePayStructure` on the `VehicleConf` table. All the data in the column will be lost.
  - You are about to drop the column `priorityBonus` on the `VehicleConf` table. All the data in the column will be lost.
  - You are about to drop the column `random` on the `VehicleConf` table. All the data in the column will be lost.
  - You are about to drop the column `sizeBonus` on the `VehicleConf` table. All the data in the column will be lost.
  - You are about to drop the column `timeSlotBonus` on the `VehicleConf` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vehicleType,country]` on the table `VehicleConf` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `countryConfigId` to the `Quest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryConfCountryConfigId` to the `VehicleConf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleType` to the `VehicleConf` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quest" DROP CONSTRAINT "Quest_countryConfigCountryConfigId_fkey";

-- AlterTable
ALTER TABLE "PackageTypeBonusStructure" DROP COLUMN "criteria";

-- AlterTable
ALTER TABLE "Quest" DROP COLUMN "countryConfigCountryConfigId",
ADD COLUMN     "countryConfigId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VehicleConf" DROP COLUMN "accessibilityBonus",
DROP COLUMN "cashOnDeliveryBonus",
DROP COLUMN "incentivePayStructure",
DROP COLUMN "priorityBonus",
DROP COLUMN "random",
DROP COLUMN "sizeBonus",
DROP COLUMN "timeSlotBonus",
ADD COLUMN     "countryConfCountryConfigId" TEXT NOT NULL,
ADD COLUMN     "vehicleType" "VehicleType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VehicleConf_vehicleType_country_key" ON "VehicleConf"("vehicleType", "country");

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_countryConfigId_fkey" FOREIGN KEY ("countryConfigId") REFERENCES "CountryConf"("countryConfigId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleConf" ADD CONSTRAINT "VehicleConf_countryConfCountryConfigId_fkey" FOREIGN KEY ("countryConfCountryConfigId") REFERENCES "CountryConf"("countryConfigId") ON DELETE RESTRICT ON UPDATE CASCADE;
