import { z } from "zod";
import { prisma } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const questsRouter = createTRPCRouter({
  getRewardTracksByDriverId: publicProcedure
    .input(z.object({ driverId: z.string() }))
    .query(async ({ input: { driverId } }) => {
      const pDriver = prisma.driver.findUnique({ where: { id: driverId } });
      const pQuests = prisma.quest.findMany({});
      const [driver, quests] = await Promise.all([pDriver, pQuests]);
      if (!driver) throw new Error("Driver ID does not exist");
      const questsAndProgressions = await Promise.all(
        quests.map(async (quest) => {
          let questProgression = await prisma.questProgression.findUnique({
            where: {
              questId_driverId: { questId: quest.id, driverId: driverId },
              month_year: {
                month: new Date().getMonth(),
                year: new Date().getFullYear(),
              },
            },
          });
          if (!questProgression) {
            questProgression = await prisma.questProgression.create({
              data: {
                quest: { connect: { id: quest.id } },
                driver: { connect: { id: driverId } },
                month: new Date().getMonth(),
                year: new Date().getFullYear(),
              },
            });
          }
          return { rewardTrack: quest, progression: questProgression };
        })
      );
      return questsAndProgressions;
    }),
  getQuestBonusByDriverId: publicProcedure
    .input(z.object({ driverId: z.string() }))
    .query(async ({ input: { driverId } }) => {
      const pDriver = prisma.driver.findUnique({ where: { id: driverId } });
      const pQuestProgressions = prisma.questProgression.findMany({
        where: {
          driverId,
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
        },
        include: { quest: true },
      });
      const [driver, questProgressions] = await Promise.all([
        pDriver,
        pQuestProgressions,
      ]);

      if (!driver) throw new Error("Driver does not exist");

      const questBonuses: { title: string; bonus: number }[] =
        questProgressions.map(({ quest, ...progression }) => {
          const { bronzeThreshold, silverThreshold, goldThreshold } = quest;
          let bonus = 0;
          if (progression.currentProgression >= goldThreshold) {
            bonus = quest.goldReward;
          } else if (progression.currentProgression >= silverThreshold) {
            bonus = quest.silverReward;
          } else if (progression.currentProgression >= bronzeThreshold) {
            bonus = quest.bronzeReward;
          }
          return { title: quest.title, bonus: bonus };
        });
      return questBonuses;
    }),
});
