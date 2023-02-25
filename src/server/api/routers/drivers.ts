import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getDriverMinimumGoal } from "../helpers/drivers.helpers";

export const driversRouter = createTRPCRouter({
  getMinimumGoalByDriverId: publicProcedure
    .input(z.object({ driverId: z.string() }))
    .query(async ({ input: { driverId } }) => {
      return getDriverMinimumGoal(driverId);
    }),
});
