/*
  Warnings:

  - The primary key for the `Quest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bonusAmount` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the column `countryConfigId` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the column `frequency` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the column `questId` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the column `targetPercentage` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the column `targetValue` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the `QuestInstance` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bronzeThreshold` to the `Quest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Quest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goldThreshold` to the `Quest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `silverThreshold` to the `Quest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quest" DROP CONSTRAINT "Quest_countryConfigId_fkey";

-- DropForeignKey
ALTER TABLE "QuestInstance" DROP CONSTRAINT "QuestInstance_driverId_fkey";

-- DropForeignKey
ALTER TABLE "QuestInstance" DROP CONSTRAINT "QuestInstance_questId_fkey";

-- AlterTable
ALTER TABLE "Quest" DROP CONSTRAINT "Quest_pkey",
DROP COLUMN "bonusAmount",
DROP COLUMN "countryConfigId",
DROP COLUMN "frequency",
DROP COLUMN "questId",
DROP COLUMN "targetPercentage",
DROP COLUMN "targetValue",
DROP COLUMN "type",
ADD COLUMN     "bronzeThreshold" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "goldThreshold" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "silverThreshold" INTEGER NOT NULL,
ADD CONSTRAINT "Quest_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "QuestInstance";

-- CreateTable
CREATE TABLE "QuestProgression" (
    "questId" INTEGER NOT NULL,
    "driverId" TEXT NOT NULL,
    "currentProgression" INTEGER NOT NULL,

    CONSTRAINT "QuestProgression_pkey" PRIMARY KEY ("questId","driverId")
);

-- AddForeignKey
ALTER TABLE "QuestProgression" ADD CONSTRAINT "QuestProgression_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestProgression" ADD CONSTRAINT "QuestProgression_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
