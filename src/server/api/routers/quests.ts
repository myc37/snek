import { z } from "zod";
import { prisma } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const questsRouter = createTRPCRouter({
  getRewardTracksByDriverId: publicProcedure
    .input(z.object({ driverId: z.string() }))
    .query(async ({ input: { driverId } }) => {
      const quests = await prisma.quest.findMany({});
      const questsAndProgressions = await Promise.all(
        quests.map(async (quest) => {
          const questProgression = await prisma.questProgression.findUnique({
            where: {
              questId_driverId: { questId: quest.id, driverId: driverId },
            },
          });
          return { rewardTrack: quest, progression: questProgression };
        })
      );
      return questsAndProgressions;
    }),
});
