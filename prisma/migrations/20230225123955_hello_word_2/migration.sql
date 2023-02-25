/*
  Warnings:

  - You are about to drop the column `value` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the column `isComplete` on the `QuestInstance` table. All the data in the column will be lost.
  - Added the required column `country` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minimumGoal` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bonusAmount` to the `Quest` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "QuestInstance_driverId_questId_key";

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "country" "Country" NOT NULL,
ADD COLUMN     "minimumGoal" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Quest" DROP COLUMN "value",
ADD COLUMN     "bonusAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "targetValue" INTEGER;

-- AlterTable
ALTER TABLE "QuestInstance" DROP COLUMN "isComplete",
ADD COLUMN     "currentValue" INTEGER,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;
