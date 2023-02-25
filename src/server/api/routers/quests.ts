import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  getAllQuestInstancesForDriver,
  getCompletedQuestInstancesForDriver,
  getQuestBonusForDriver,
} from "../helpers/quests.helpers";

export const questsRouter = createTRPCRouter({
  getAllQuestsByDriverId: publicProcedure
    .input(z.object({ driverId: z.string() }))
    .query(async ({ input: { driverId } }) => {
      return await getAllQuestInstancesForDriver(driverId);
    }),
  getQuestTotalAndArrayByDriverId: publicProcedure
    .input(z.object({ driverId: z.string() }))
    .query(async ({ input: { driverId } }) => {
      const questTotal = await getQuestBonusForDriver(driverId);
      const questArray = await getCompletedQuestInstancesForDriver(driverId);
      return { questTotal, questArray };
    }),
});
