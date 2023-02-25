/*
  Warnings:

  - A unique constraint covering the columns `[month,year]` on the table `QuestProgression` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bronzeReward` to the `Quest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goldReward` to the `Quest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `silverReward` to the `Quest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `QuestProgression` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `QuestProgression` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quest" ADD COLUMN     "bronzeReward" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "goldReward" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "silverReward" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "QuestProgression" ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL,
ALTER COLUMN "currentProgression" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "QuestProgression_month_year_key" ON "QuestProgression"("month", "year");
