import type { FeQuest } from "~/types/quests";
import { prisma } from "~/server/db";

export const getAllQuestsForDriver = async (driverId: string) => {
  const driver = await prisma.driver.findUnique({
    where: { id: driverId },
    select: { country: true },
  });

  if (!driver) return [];

  return await prisma.quest.findMany({
    where: { countryConfig: { country: driver.country } },
  });
};

export const getAllQuestInstancesForDriver = async (driverId: string) => {
  const result: FeQuest[] = [];

  const quests = await getAllQuestsForDriver(driverId);

  for (const quest of quests) {
    const {
      questId,
      title,
      bonusAmount,
      targetPercentage,
      targetValue,
      frequency,
    } = quest;
    let instance = await prisma.questInstance.findFirst({
      where: {
        questId,
        driverId,
        ...(frequency == "DAILY"
          ? { date: new Date() }
          : { isCompleted: false }),
      },
    });
    if (!instance) {
      instance = await prisma.questInstance.create({
        data: {
          questId: quest.questId,
          driverId,
          date: new Date(),
          isCompleted: false,
          currentValue: 0,
        },
      });
    }
    const { questInstanceId, currentValue, isCompleted } = instance;

    result.push({
      title,
      bonusAmount,
      targetPercentage,
      targetValue,
      frequency,
      questInstanceId,
      currentValue,
      isCompleted: isCompleted,
    });
  }

  return result;
};

export const getCompletedQuestInstancesForDriver = async (driverId: string) => {
  return await prisma.questInstance.findMany({
    where: { driverId, isCompleted: true },
    include: { quest: { select: { bonusAmount: true } } },
  });
};

export const getQuestBonusForDriver = async (driverId: string) => {
  const completedQuestInstances = await getCompletedQuestInstancesForDriver(
    driverId
  );
  return completedQuestInstances.reduce((a, b) => a + b.quest.bonusAmount, 0);
};
