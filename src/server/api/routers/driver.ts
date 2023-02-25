import { create } from "domain";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const driversRouter = create({
  getQtyBonusByDriverId: publicProcedure.input(
    z
      .object({ driverId: z.string() })
      .query(async ({ input: { driverId } }) => {})
  ),
});
