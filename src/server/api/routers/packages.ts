import { ParcelStatus } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const packagesRouter = createTRPCRouter({
  getNonCompletedByDriverId: publicProcedure
    .input(z.object({ driverId: z.string() }))
    .query(async ({ input: { driverId } }) => {
      return await prisma.parcel.findMany({
        where: {
          driverId,
          NOT: { status: "DELIVERED" },
        },
      });
    }),
  getCompletedCurrentMonthByDriverId: publicProcedure
    .input(z.object({ driverId: z.string() }))
    .query(async ({ input: { driverId } }) => {
      return await prisma.parcel.findMany({
        where: {
          driverId,
          status: "DELIVERED",
          deliveryDate: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      });
    }),
  updateStatusByTrackingNumber: publicProcedure
    .input(
      z.object({
        trackingNumber: z.string(),
        status: z.nativeEnum(ParcelStatus),
      })
    )
    .mutation(async ({ input: { trackingNumber, status } }) => {
      await prisma.parcel.update({
        where: { trackingNumber: trackingNumber },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: { status },
      });
    }),
});
