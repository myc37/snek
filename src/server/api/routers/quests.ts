import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const questsRouter = createTRPCRouter({
  getDailyQuestsByDriverId: publicProcedure
    .input(z.object({ driverId: z.string() }))
    .query(async ({ input: { driverId } }) => {
      return await prisma.quest.findMany({
        where: {
          frequency: "DAILY",
        },
        select: {
          questInstance: { where: { driverId } },
        },
      });
    }),
  getRepeatableQuestByDriverId: publicProcedure
    .input(z.object({ driverId: z.string() }))
    .query(async ({ input: { driverId } }) => {
      return await prisma.quest.findMany({
        where: {
          frequency: "REPEATABLE",
        },
        select: {
          questInstance: { where: { driverId } },
        },
      });
    }),
});
