/*
  Warnings:

  - You are about to alter the column `bronzeReward` on the `Quest` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `goldReward` on the `Quest` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `silverReward` on the `Quest` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - The primary key for the `QuestProgression` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "QuestProgression_month_year_key";

-- AlterTable
ALTER TABLE "Quest" ALTER COLUMN "bronzeReward" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "goldReward" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "silverReward" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "QuestProgression" DROP CONSTRAINT "QuestProgression_pkey",
ADD CONSTRAINT "QuestProgression_pkey" PRIMARY KEY ("questId", "driverId", "month", "year");
