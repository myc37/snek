-- CreateEnum
CREATE TYPE "PackageBonusType" AS ENUM ('L_SIZE', 'CASH_ON_DELIVERY', 'RETURN_PACKAGE');

-- CreateEnum
CREATE TYPE "Country" AS ENUM ('SG', 'MY', 'TH', 'IN', 'VN', 'PH');

-- CreateEnum
CREATE TYPE "QuestFreq" AS ENUM ('DAILY', 'REPEATABLE');

-- CreateEnum
CREATE TYPE "QuestType" AS ENUM ('ATTENDANCE', 'SUCCESSFUL');

-- CreateEnum
CREATE TYPE "InfractionType" AS ENUM ('FAKE_FAILURE', 'NO_PROOF_OF_RECEIPT');

-- CreateEnum
CREATE TYPE "FailureReason" AS ENUM ('CANNOT_MAKE_IT', 'NOT_HOME');

-- CreateEnum
CREATE TYPE "ParcelStatus" AS ENUM ('UNDELIVERED', 'ATTEMPTED', 'DELIVERED');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('XS', 'S', 'M', 'L');

-- CreateEnum
CREATE TYPE "DeliveryType" AS ENUM ('CONTACTLESS', 'IN_PERSON', 'RETURN', 'CASH_ON_DELIVERY');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('VAN', 'MOTORCYCLE', 'CAR_SEDAN', 'CAR_SUV', 'LORRY');

-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "vehicleType" "VehicleType" NOT NULL,
    "homeStation" TEXT NOT NULL,
    "vehicleConfigId" TEXT NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parcel" (
    "trackingNumber" TEXT NOT NULL,
    "assignedDate" TIMESTAMP(3) NOT NULL,
    "deliveryDate" TIMESTAMP(3),
    "size" "Size" NOT NULL,
    "recipientName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "type" "DeliveryType" NOT NULL,
    "isCash" BOOLEAN NOT NULL,
    "status" "ParcelStatus" NOT NULL,
    "failureReason" "FailureReason" NOT NULL,
    "driverId" TEXT NOT NULL,

    CONSTRAINT "Parcel_pkey" PRIMARY KEY ("trackingNumber")
);

-- CreateTable
CREATE TABLE "Infraction" (
    "infractionId" TEXT NOT NULL,
    "type" "InfractionType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "driverId" TEXT NOT NULL,

    CONSTRAINT "Infraction_pkey" PRIMARY KEY ("infractionId")
);

-- CreateTable
CREATE TABLE "Quest" (
    "questId" TEXT NOT NULL,
    "type" "QuestType" NOT NULL,
    "targetPercentage" INTEGER,
    "title" TEXT NOT NULL,
    "value" INTEGER,
    "countryConfigCountryConfigId" TEXT NOT NULL,
    "frequency" "QuestFreq" NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("questId")
);

-- CreateTable
CREATE TABLE "QuestInstance" (
    "questInstanceId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isComplete" BOOLEAN NOT NULL,
    "driverId" TEXT NOT NULL,
    "questId" TEXT NOT NULL,

    CONSTRAINT "QuestInstance_pkey" PRIMARY KEY ("questInstanceId")
);

-- CreateTable
CREATE TABLE "VehicleConf" (
    "vehicleConfigId" TEXT NOT NULL,
    "baseSalary" INTEGER NOT NULL,
    "incentivePayStructure" JSONB NOT NULL,
    "sizeBonus" JSONB NOT NULL,
    "cashOnDeliveryBonus" INTEGER NOT NULL,
    "accessibilityBonus" INTEGER NOT NULL,
    "priorityBonus" INTEGER NOT NULL,
    "timeSlotBonus" INTEGER NOT NULL,
    "random" TEXT NOT NULL,
    "country" "Country" NOT NULL,

    CONSTRAINT "VehicleConf_pkey" PRIMARY KEY ("vehicleConfigId")
);

-- CreateTable
CREATE TABLE "PackageTypeBonusStructure" (
    "typeBonusId" TEXT NOT NULL,
    "vehicleConfigId" TEXT NOT NULL,
    "packageType" "PackageBonusType" NOT NULL,
    "criteria" INTEGER NOT NULL,
    "bonus" INTEGER NOT NULL,

    CONSTRAINT "PackageTypeBonusStructure_pkey" PRIMARY KEY ("typeBonusId")
);

-- CreateTable
CREATE TABLE "IncentivePayStructure" (
    "incentivePayId" TEXT NOT NULL,
    "vehicleConfigId" TEXT NOT NULL,
    "driverId" TEXT,
    "targetPackages" INTEGER NOT NULL,
    "bonusPayment" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "IncentivePayStructure_pkey" PRIMARY KEY ("incentivePayId")
);

-- CreateTable
CREATE TABLE "CountryConf" (
    "countryConfigId" TEXT NOT NULL,
    "country" "Country" NOT NULL,
    "isInfractionVisible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CountryConf_pkey" PRIMARY KEY ("countryConfigId")
);

-- CreateTable
CREATE TABLE "InfractionPayStructure" (
    "id" TEXT NOT NULL,
    "countryConfigId" TEXT NOT NULL,
    "infractionType" "InfractionType" NOT NULL,
    "deduction" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "InfractionPayStructure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestInstance_driverId_questId_key" ON "QuestInstance"("driverId", "questId");

-- CreateIndex
CREATE UNIQUE INDEX "PackageTypeBonusStructure_vehicleConfigId_packageType_key" ON "PackageTypeBonusStructure"("vehicleConfigId", "packageType");

-- CreateIndex
CREATE UNIQUE INDEX "CountryConf_country_key" ON "CountryConf"("country");

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_vehicleConfigId_fkey" FOREIGN KEY ("vehicleConfigId") REFERENCES "VehicleConf"("vehicleConfigId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parcel" ADD CONSTRAINT "Parcel_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Infraction" ADD CONSTRAINT "Infraction_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_countryConfigCountryConfigId_fkey" FOREIGN KEY ("countryConfigCountryConfigId") REFERENCES "CountryConf"("countryConfigId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestInstance" ADD CONSTRAINT "QuestInstance_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestInstance" ADD CONSTRAINT "QuestInstance_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("questId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageTypeBonusStructure" ADD CONSTRAINT "PackageTypeBonusStructure_vehicleConfigId_fkey" FOREIGN KEY ("vehicleConfigId") REFERENCES "VehicleConf"("vehicleConfigId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncentivePayStructure" ADD CONSTRAINT "IncentivePayStructure_vehicleConfigId_fkey" FOREIGN KEY ("vehicleConfigId") REFERENCES "VehicleConf"("vehicleConfigId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncentivePayStructure" ADD CONSTRAINT "IncentivePayStructure_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfractionPayStructure" ADD CONSTRAINT "InfractionPayStructure_countryConfigId_fkey" FOREIGN KEY ("countryConfigId") REFERENCES "CountryConf"("countryConfigId") ON DELETE RESTRICT ON UPDATE CASCADE;
