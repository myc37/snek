import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  getAllQuestInstancesForDriver,
  getQuestBonusForDriver,
} from "../helpers/quests.helpers";

export const questsRouter = createTRPCRouter({
  getAllQuestsByDriverId: publicProcedure
    .input(z.object({ driverId: z.string() }))
    .query(async ({ input: { driverId } }) => {
      return await getAllQuestInstancesForDriver(driverId);
    }),
  getQuestBonusByDriverId: publicProcedure
    .input(z.object({ driverId: z.string() }))
    .query(async ({ input: { driverId } }) => {
      return await getQuestBonusForDriver(driverId);
    }),
});
